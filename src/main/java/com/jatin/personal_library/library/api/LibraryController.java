package com.jatin.personal_library.library.api;

import com.jatin.personal_library.library.dto.AddManualBookRequest;
import com.jatin.personal_library.library.dto.LibraryRow;
import com.jatin.personal_library.library.dto.UpdateLibraryRequest;
import com.jatin.personal_library.library.dto.UpdateStatusRequest;
import com.jatin.personal_library.library.repo.UserBookRepository;
import com.jatin.personal_library.library.service.LibraryService;
import com.jatin.personal_library.config.JwtService;
import com.jatin.personal_library.library.dto.ImportByGoogleRequest;
import com.jatin.personal_library.user.User;
import com.jatin.personal_library.user.UserRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;


import java.net.URI;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/me")
public class LibraryController {

    private final LibraryService libraryService;
    private final JwtService jwtService;
    private final UserBookRepository userBooks;

    public LibraryController(LibraryService libraryService, JwtService jwtService, UserBookRepository userBooks) {
        this.libraryService = libraryService;
        this.jwtService = jwtService;
        this.userBooks = userBooks;
    }

    private Integer requireUid(HttpServletRequest request) {
        String auth = request.getHeader("Authorization");
        if (auth == null || !auth.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing/invalid Authorization header");
        }
        String token = auth.substring(7);
        Integer uid = jwtService.extractClaim(token, claims -> claims.get("uid", Integer.class));
        if (uid == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token missing uid claim");
        }
        return uid;
    }

    @GetMapping("/library")
    public Page<LibraryRow> myLibrary(
            @RequestParam(required = false) String q,
            Pageable pageable,
            HttpServletRequest request
    ) {
        Integer uid = requireUid(request);
        String query = (q == null || q.isBlank()) ? null : q;

        return libraryService.listUserLibrary(uid, query, pageable);
    }

    // ===== PUT /me/library/{id} - full update of status/rating/notes =====
    @PutMapping("/library/{id}")
    @Transactional
    public LibraryRow updateEntry(@PathVariable UUID id,
                                @Valid @RequestBody UpdateLibraryRequest body,
                                HttpServletRequest request) {
        Integer uid = requireUid(request);

        var ub = userBooks.findByIdAndUserIdFetchBook(id, uid)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Library entry not found"));

        if (body.status() != null)  ub.setStatus(body.status());
        if (body.rating() != null)  ub.setRating(body.rating());
        ub.setNotes(body.notes());

        userBooks.save(ub); // still inside the transaction

        var b = ub.getBook(); // safe: fetched eagerly
        return new LibraryRow(
                ub.getId(), b.getId(), b.getTitle(), b.getAuthors(),
                b.getPublishedYear(), ub.getStatus(), ub.getRating()
        );
    }

    // ===== PATCH /me/library/{id}/status - quick status-only update =====
    @PatchMapping("/library/{id}/status")
    @Transactional
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateStatus(@PathVariable UUID id,
                             @RequestBody UpdateStatusRequest body,
                             HttpServletRequest request) {
        Integer uid = requireUid(request);

        var ub = userBooks.findByIdAndUserId(id, uid)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Library entry not found"));

        ub.setStatus(body.status());
        userBooks.save(ub);
    }

    // ===== DELETE /me/library/{id} - remove entry =====
    @DeleteMapping("/library/{id}")
    @Transactional
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable UUID id, HttpServletRequest request) {
        Integer uid = requireUid(request);

        var ub = userBooks.findByIdAndUserId(id, uid)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Library entry not found"));

        userBooks.delete(ub);
    }

    @PostMapping("/library")
    @Transactional
    public ResponseEntity<LibraryRow> addManual(
            @Valid @RequestBody AddManualBookRequest body,
            HttpServletRequest request
    ) {
        Integer uid = requireUid(request);
        var result = libraryService.addManual(uid, body);

        URI location = URI.create("/me/library/" + result.userBookId());
        return result.created()
                ? ResponseEntity.created(location).body(result.row())
                : ResponseEntity.ok(result.row());
    }

    @PostMapping("/library/import")
    @Transactional
    public ResponseEntity<LibraryRow> importByGoogle(
            @RequestBody ImportByGoogleRequest body,
            HttpServletRequest request
    ) {
        Integer uid = requireUid(request);

        var result = libraryService.importByGoogleVolumeId(uid, body.googleVolumeId());

        URI location = URI.create("/me/library/" + result.userBookId());
        return result.created()
                ? ResponseEntity.created(location).body(result.row())
                : ResponseEntity.ok(result.row());
    }

}
