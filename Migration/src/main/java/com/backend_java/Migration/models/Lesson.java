package com.backend_java.Migration.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "lessons")
public class Lesson {
    @Id
    @JsonProperty("_id")
    private String id;

    private String title;

    @Indexed(unique = true)
    private String slug;

    @Builder.Default
    private LessonType type = LessonType.LESSON;

    @Builder.Default
    private DifficultyLevel level = DifficultyLevel.BEGINNER;

    private String description;

    @Builder.Default
    private List<Object> content = new ArrayList<>();

    @Builder.Default
    private int xpReward = 50;

    private int order;

    @Builder.Default
    private List<String> prerequisites = new ArrayList<>();

    @Builder.Default
    private boolean isPublished = false;

    public enum LessonType {
        UNIT, LESSON
    }

    public enum DifficultyLevel {
        BEGINNER, INTERMEDIATE, ADVANCED, MASTER
    }
}
