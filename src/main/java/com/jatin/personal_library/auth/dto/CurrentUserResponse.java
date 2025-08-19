package com.jatin.personal_library.auth.dto;

import com.jatin.personal_library.user.Role;

public record CurrentUserResponse(
    Integer id,
    String email,
    String displayName,
    Role role
) {}
