package com.backend_java.Migration.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "progress")
@CompoundIndex(name = "user_lesson_idx", def = "{'userId': 1, 'lessonId': 1}", unique = true)
public class Progress {
    @Id
    private String id;

    private String userId;
    private String lessonId;

    @Builder.Default
    private Status status = Status.LOCKED;

    @Builder.Default
    private int bestScore = 0;

    @Builder.Default
    private int attempts = 0;

    private LocalDateTime lastAttemptAt;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    public enum Status {
        LOCKED, UNLOCKED, COMPLETED
    }
}
