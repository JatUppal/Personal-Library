package com.jatin.personal_library.library.repo;

import com.jatin.personal_library.library.domain.ReadingStatus;
import com.jatin.personal_library.library.domain.UserBook;
import com.jatin.personal_library.library.dto.LibraryRow;
import com.jatin.personal_library.library.domain.Book;
import com.jatin.personal_library.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UserBookRepository extends JpaRepository<UserBook, UUID> {

    // Uniqueness guard (user_id, book_id)
    Optional<UserBook> findByUserIdAndBookId(Integer userId, UUID bookId);
    Optional<UserBook> findByIdAndUserId(UUID id, Integer userId);
    boolean existsByUserIdAndBookId(Integer userId, UUID bookId);

    // Navigating from either side
    Page<UserBook> findByUserId(Integer userId, Pageable pageable);
    Page<UserBook> findByUserIdAndStatus(Integer userId, ReadingStatus status, Pageable pageable);

    // When you already have entities loaded
    Optional<UserBook> findByUserAndBook(User user, Book book);

    // Stats / counts
    long countByUserId(Integer userId);
    long countByUserIdAndStatus(Integer userId, ReadingStatus status);

    // Deletes
    void deleteByUserIdAndBookId(Integer userId, UUID bookId);

    @Query("""
           select ub
           from UserBook ub
           join fetch ub.book b
           where ub.id = :id and ub.user.id = :userId
           """)
    Optional<UserBook> findByIdAndUserIdFetchBook(@Param("id") UUID id, @Param("userId") Integer userId);

    @Query("""
           select new com.jatin.personal_library.library.dto.LibraryRow(
             ub.id, b.id, b.title, b.authors, b.publishedYear,
             ub.status, ub.rating, b.coverUrl
           )
           from UserBook ub
           join ub.book b
           where ub.user.id = :userId
           order by b.title
           """)
    Page<LibraryRow> findRows(@Param("userId") Integer userId, Pageable pageable);

    /**  Uncomment this if your service supports search (?q=)
    @Query("""
           select new com.jatin.personal_library.library.dto.LibraryRow(
             ub.id, b.id, b.title, b.authors, b.publishedYear,
             ub.status, ub.rating, b.coverUrl
           )
           from UserBook ub
           join ub.book b
           where ub.user.id = :userId
             and (
               :q is null
               or lower(b.title)   like lower(concat('%', :q, '%'))
               or lower(b.authors) like lower(concat('%', :q, '%'))
             )
           order by b.title
           """)
    Page<LibraryRow> findRowsFiltered(@Param("userId") Integer userId,
                                      @Param("q") String q,
                                      Pageable pageable);**/
}
