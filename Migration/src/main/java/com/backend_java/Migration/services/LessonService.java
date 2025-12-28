package com.backend_java.Migration.services;

import com.backend_java.Migration.models.Lesson;
import java.util.List;
import java.util.Map;

public interface LessonService {
    /**
     * Get all lessons with progress for a specific user.
     * Maps to: GET /api/curriculum
     */
    List<Map<String, Object>> getCurriculumForUser(String userId);

    /**
     * Get lesson details and its questions by slug.
     * Maps to: GET /api/curriculum/:slug
     */
    Map<String, Object> getLessonWithQuestions(String slug);

    /**
     * Complete a lesson and unlock the next one.
     * Maps to: POST /api/progress/complete-lesson
     */
    void completeLesson(String userId, String lessonId, int score);

    Lesson getLessonById(String lessonId);
}
