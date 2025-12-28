package com.backend_java.Migration.dto;

import lombok.Data;

@Data
public class CompleteLessonRequest {
    private String lessonId;
    private int score;
}
