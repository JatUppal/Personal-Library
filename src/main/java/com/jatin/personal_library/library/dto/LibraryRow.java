package com.jatin.personal_library.library.dto;

import com.jatin.personal_library.library.domain.ReadingStatus;
import java.util.UUID;

public record LibraryRow(
        UUID id,
        UUID bookId,
        String title,
        String authors,
        Integer publishedYear,
        ReadingStatus status,
        Integer rating
) {}
