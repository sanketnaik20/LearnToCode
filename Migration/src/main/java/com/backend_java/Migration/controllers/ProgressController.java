package com.backend_java.Migration.controllers;

import com.backend_java.Migration.dto.ApiResponse;
import com.backend_java.Migration.dto.CompleteLessonRequest;
import com.backend_java.Migration.dto.ProgressRequest;
import com.backend_java.Migration.services.LessonService;
import com.backend_java.Migration.services.ProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class ProgressController {

    private final ProgressService progressService;
    private final LessonService lessonService;

    @PostMapping("/validate")
    public ResponseEntity<ApiResponse<Map<String, Object>>> validateAnswer(@RequestBody ProgressRequest request) {
        // userId from JWT filter
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<String, Object> result = progressService.validateAnswer(userId, request.getQuestionId(), request.getAnswer());
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @PostMapping("/complete-lesson")
    public ResponseEntity<ApiResponse<String>> completeLesson(@RequestBody CompleteLessonRequest request) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        lessonService.completeLesson(userId, request.getLessonId(), request.getScore());
        return ResponseEntity.ok(ApiResponse.success("Lesson marked as complete and next lesson unlocked."));
    }
}
