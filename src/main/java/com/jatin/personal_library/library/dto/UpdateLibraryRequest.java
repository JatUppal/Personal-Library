package com.jatin.personal_library.library.dto;

import com.jatin.personal_library.library.domain.ReadingStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record UpdateLibraryRequest(
    ReadingStatus status,
    @Min(1) @Max(5) Integer rating,
    String notes
) {}
