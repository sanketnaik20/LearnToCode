package com.backend_java.Migration.controllers;

import com.backend_java.Migration.dto.ApiResponse;
import com.backend_java.Migration.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/leaderboard")
@RequiredArgsConstructor
public class LeaderboardController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getLeaderboard() {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<String, Object> data = userService.getLeaderboard(userId);
        return ResponseEntity.ok(ApiResponse.success(data));
    }
}
