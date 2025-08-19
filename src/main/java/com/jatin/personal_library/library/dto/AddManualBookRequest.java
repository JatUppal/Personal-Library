package com.jatin.personal_library.library.dto;

import jakarta.validation.constraints.NotBlank;

public record AddManualBookRequest(
        @NotBlank String title,
        String authors,
        Integer publishedYear,
        String isbn13   // optional
) {}