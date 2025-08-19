package com.jatin.personal_library.library.dto;

import java.util.UUID;

public record LibraryDetails(
        UUID id,
        String title,
        String authors,
        Integer publishedYear,
        String status,
        Integer rating,
        String isbn13,
        Integer pageCount,
        String coverUrl,
        String description
) {}
