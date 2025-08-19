package com.jatin.personal_library.library.service;

import com.jatin.personal_library.library.domain.Book;
import com.jatin.personal_library.library.domain.ReadingStatus;
import com.jatin.personal_library.library.domain.UserBook;
import com.jatin.personal_library.library.dto.AddManualBookRequest;
import com.jatin.personal_library.library.dto.LibraryRow;
import com.jatin.personal_library.library.repo.BookRepository;
import com.jatin.personal_library.library.repo.UserBookRepository;
import com.jatin.personal_library.user.User;

import jakarta.persistence.EntityManager;

import java.util.UUID;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.Map;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.regex.Matcher;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LibraryService {
    private final UserBookRepository userBooks;
    private final BookRepository books;
    private final EntityManager em;
    private final WebClient googleBooks;

    public LibraryService(UserBookRepository userBookRepository, BookRepository books, EntityManager em, WebClient googleBooksClient) {
        this.userBooks = userBookRepository;
        this.books = books;
        this.em = em;
        this.googleBooks = googleBooksClient;
    }

    public Page<LibraryRow> listUserLibrary(Integer userId, String q, Pageable pageable) {
        return userBooks.findRows(userId, pageable);
    }

    @Transactional
    public Result addManual(int uid, AddManualBookRequest req) {
        // helper
        java.util.function.Function<String,String> t = s ->
            (s == null || s.trim().isEmpty()) ? null : s.trim();

        // 1) find-or-create Book (by isbn13 if provided)
        Book book;
        if (req.isbn13() != null && !req.isbn13().isBlank()) {
            String isbn = normalizeIsbn(req.isbn13());
            book = books.findByIsbn13(isbn).orElse(null);
            if (book == null) {
                // create new with ALL props (incl. cover/description)
                Book b = new Book(t.apply(req.title()));
                b.setAuthors(t.apply(req.authors()));
                b.setPublishedYear(req.publishedYear());
                b.setIsbn13(isbn);
                b.setPageCount(req.pageCount());
                b.setCoverUrl(t.apply(req.coverUrl()));         // <-- persist cover
                b.setDescription(t.apply(req.description()));   // <-- persist description
                book = books.save(b);
            } else {
                // already have this book — optionally fill missing fields
                if (book.getCoverUrl() == null && req.coverUrl() != null && !req.coverUrl().isBlank()) {
                    book.setCoverUrl(t.apply(req.coverUrl()));
                }
                if ((book.getDescription() == null || book.getDescription().isBlank())
                        && req.description() != null && !req.description().isBlank()) {
                    book.setDescription(t.apply(req.description()));
                }
                // also allow updating title/authors/year if they were empty
                if (book.getTitle() == null)        book.setTitle(t.apply(req.title()));
                if (book.getAuthors() == null)      book.setAuthors(t.apply(req.authors()));
                if (book.getPublishedYear() == null) book.setPublishedYear(req.publishedYear());
                if (book.getPageCount() == null)     book.setPageCount(req.pageCount());
                book = books.save(book);
            }
        } else {
            // no ISBN — create a new Book with all fields
            Book b = new Book(t.apply(req.title()));
            b.setAuthors(t.apply(req.authors()));
            b.setPublishedYear(req.publishedYear());
            b.setPageCount(req.pageCount());
            b.setCoverUrl(t.apply(req.coverUrl()));          // <-- persist cover
            b.setDescription(t.apply(req.description()));    // <-- persist description
            book = books.save(b);
        }

        // 2) if user already has this book, return existing row (idempotent)
        Optional<UserBook> existing = userBooks.findByUserIdAndBookId(uid, book.getId());
        if (existing.isPresent()) {
            UserBook ub = existing.get();
            return new Result(toRow(ub), false, ub.getId());
        }

        // 3) create UserBook with default status; mirror description into notes
        User userRef = em.getReference(User.class, uid);
        UserBook ub = new UserBook(userRef, book);
        ub.setStatus(ReadingStatus.PLANNED);
        ub.setNotes(t.apply(req.description())); // <-- so details() shows it immediately
        ub = userBooks.save(ub);

        return new Result(toRow(ub), true, ub.getId());
    }


    @Transactional
    public Result importByGoogleVolumeId(int uid, String volumeId) {
        if (volumeId == null || volumeId.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "googleVolumeId required");
        }

        // 1) Fetch volume from Google Books
        Map<String,Object> resp = googleBooks.get()
            .uri(u -> u.path("/volumes/{id}").build(volumeId))
            .retrieve()
            .bodyToMono(Map.class)
            .block();

        if (resp == null) {
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Google Books returned no data");
        }

        Map<String,Object> vol = (Map<String,Object>) resp.getOrDefault("volumeInfo", Map.of());

        // 2) Extract fields
        String title = (String) vol.get("title");
        List<String> authorsList = (List<String>) vol.getOrDefault("authors", List.of());
        String authors = String.join(", ", authorsList);

        Integer publishedYear = null;
        Object pd = vol.get("publishedDate");
        if (pd instanceof String pdStr) {
            Matcher m = Pattern.compile("^(\\d{4})").matcher(pdStr);
            if (m.find()) publishedYear = Integer.parseInt(m.group(1));
        }

        List<Map<String,String>> ids =
            (List<Map<String,String>>) vol.getOrDefault("industryIdentifiers", List.of());
        String isbn13 = ids.stream()
            .filter(m -> "ISBN_13".equals(m.get("type")))
            .map(m -> m.get("identifier"))
            .findFirst().orElse(null);

        Map<String,Object> img = (Map<String,Object>) vol.getOrDefault("imageLinks", Map.of());
        String coverUrl = (String) img.getOrDefault("thumbnail", null);
        String description = (String) vol.get("description");
        String googleVolumeId = (String) resp.get("id");

        if (title == null || title.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Volume missing title");
        }

        // 3) Find-or-create Book (prefer isbn13, then googleVolumeId)
        Book book = null;
        if (isbn13 != null && !isbn13.isBlank()) {
            book = books.findByIsbn13(isbn13).orElse(null);
        }
        if (book == null && googleVolumeId != null) {
            book = books.findByGoogleVolumeId(googleVolumeId).orElse(null);
        }
        if (book == null) {
            book = new Book();
            book.setIsbn13(isbn13);
            book.setGoogleVolumeId(googleVolumeId);
            book.setTitle(title);
            book.setAuthors(authors);
            book.setPublishedYear(publishedYear);
            book.setPageCount((Integer) vol.getOrDefault("pageCount", null));
            book.setCoverUrl(coverUrl);
            book.setDescription(description);
            book = books.save(book);
        }

        // 4) If user already has this book, return existing row (idempotent)
        Optional<UserBook> existing = userBooks.findByUserIdAndBookId(uid, book.getId());
        if (existing.isPresent()) {
            UserBook ub = existing.get();
            return new Result(toRow(ub), false, ub.getId());
        }

        // 5) Create UserBook for this user
        User userRef = em.getReference(User.class, uid); // no DB hit
        UserBook ub = new UserBook(userRef, book);
        // Optional: set a default status to match addManual behavior
        ub.setStatus(ReadingStatus.PLANNED);
        ub = userBooks.save(ub);

        return new Result(toRow(ub), true, ub.getId());
    }



    private String normalizeIsbn(String s) {
        return s == null ? null : s.replaceAll("[^0-9Xx]", "");
    }

    private LibraryRow toRow(UserBook ub) {
        Book b = ub.getBook();
        return new LibraryRow(
                ub.getId(), b.getId(), b.getTitle(), b.getAuthors(),
                b.getPublishedYear(), ub.getStatus(), ub.getRating(), b.getCoverUrl()
        );
    }

    public record Result(LibraryRow row, boolean created, UUID userBookId) {}


}
