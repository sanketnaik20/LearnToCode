package com.backend_java.Migration.controllers;

import com.backend_java.Migration.dto.ApiResponse;
import com.backend_java.Migration.services.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/curriculum")
@RequiredArgsConstructor
public class CurriculumController {

    private final LessonService lessonService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getCurriculum() {
        String userId = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getName();
        List<Map<String, Object>> data = lessonService.getCurriculumForUser(userId);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getLesson(@PathVariable String slug) {
        Map<String, Object> data = lessonService.getLessonWithQuestions(slug);
        return ResponseEntity.ok(ApiResponse.success(data));
    }
}
