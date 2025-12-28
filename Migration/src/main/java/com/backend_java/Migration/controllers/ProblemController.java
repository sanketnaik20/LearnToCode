package com.backend_java.Migration.controllers;

import com.backend_java.Migration.dto.ApiResponse;
import com.backend_java.Migration.models.Problem;
import com.backend_java.Migration.services.ProblemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/problems")
@RequiredArgsConstructor
public class ProblemController {

    private final ProblemService problemService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Problem>>> getProblems() {
        return ResponseEntity.ok(ApiResponse.success(problemService.getAllProblems()));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<Problem>> getProblem(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.success(problemService.getProblemBySlug(slug)));
    }

    @GetMapping("/leetcode/{username}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getLeetCodeStats(@PathVariable String username) {
        return ResponseEntity.ok(ApiResponse.success(problemService.getLeetCodeStats(username)));
    }
}
