package com.jatin.personal_library.library.repo;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import com.jatin.personal_library.library.domain.Book;

public interface BookRepository extends JpaRepository<Book, UUID> {
    Optional<Book> findByGoogleVolumeId(String googleVolumeId);
    Optional<Book> findByIsbn13(String isbn13);

    boolean existsByGoogleVolumeId(String googleVolumeId);
    boolean existsByIsbn13(String isbn13);

    // Simple search helpers
    Page<Book> findByTitleContainingIgnoreCase(String titlePart, Pageable pageable);

    // Bulk fetch (e.g., when resolving user library rows)
    java.util.List<Book> findByIdIn(java.util.Collection<UUID> ids);
    
}
