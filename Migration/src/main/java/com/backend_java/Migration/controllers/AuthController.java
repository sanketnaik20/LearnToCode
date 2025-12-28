package com.backend_java.Migration.controllers;

import com.backend_java.Migration.dto.ApiResponse;
import com.backend_java.Migration.dto.AuthRequest;
import com.backend_java.Migration.dto.AuthResponse;
import com.backend_java.Migration.models.User;
import com.backend_java.Migration.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody User user) {
        AuthResponse response = userService.register(user);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse response = userService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<User>> getProfile() {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getProfile(userId);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @PutMapping("/update-profile")
    public ResponseEntity<ApiResponse<User>> updateProfile(
            @RequestBody Map<String, Object> updates) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.updateProfile(userId, updates);
        return ResponseEntity.ok(ApiResponse.success(user));
    }
}
