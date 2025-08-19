package com.jatin.personal_library.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jatin.personal_library.auth.dto.CurrentUserResponse;
import com.jatin.personal_library.config.JwtService;
import com.jatin.personal_library.user.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
        @RequestBody RegisterRequest request
        ) {
            return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
        @RequestBody AuthenticationRequest request
        ) {
            return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping("/me")
    public CurrentUserResponse me(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new org.springframework.web.server.ResponseStatusException(
                org.springframework.http.HttpStatus.UNAUTHORIZED, "Missing/invalid Authorization header");
        }
        String token = authHeader.substring(7);
    
        // Read Integer uid from the JWT claim you added during token generation
        Integer uid = jwtService.extractClaim(token, c -> c.get("uid", Integer.class));
        if (uid == null) throw new org.springframework.web.server.ResponseStatusException(
                org.springframework.http.HttpStatus.UNAUTHORIZED, "Token missing uid claim");
    
        var user = userRepository.findById(uid)
            .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
                org.springframework.http.HttpStatus.UNAUTHORIZED, "User not found"));
    
        return new CurrentUserResponse(user.getId(), user.getEmail(), user.getDisplayName(), user.getRole());
    }

}
