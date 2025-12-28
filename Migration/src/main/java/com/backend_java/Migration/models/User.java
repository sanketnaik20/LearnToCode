package com.backend_java.Migration.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data                // Generates Getters, Setters, toString, equals, and hashCode
@Builder             // Allow us to create objects using User.builder().username("...").build()
@NoArgsConstructor   // Required by MongoDB to create the object
@AllArgsConstructor  // Required by @Builder
@Document(collection = "users") // Tells Spring this maps to the "users" collection in MongoDB
public class User {
    @Id
    private String id;       // This is the MongoDB _id

    @Indexed(unique = true) // Ensures username is unique, just like in your JS file
    private String username;

    @Indexed(unique = true)
    private String email;

    private String password;

    @Indexed(unique = true, sparse = true)
    private String googleId;

    private String avatar;

    @Builder.Default        // Set default values when using the Builder pattern
    private int xp = 0;

    @Builder.Default
    private int streakCount = 0;

    private String collegeName;
    private String leetcodeUsername;

    @Builder.Default
    private LocalDateTime lastActiveAt = LocalDateTime.now();

    // Nested Lists (replacing Mongoose Arrays)
    @Builder.Default
    private List<QuestionHistory> questionHistory = new ArrayList<>();

    @Builder.Default
    private List<ConceptMastery> conceptMastery = new ArrayList<>();

    // Timestamps
    @CreatedDate            // Automatically set when document is created
    private LocalDateTime createdAt;

    @LastModifiedDate       // Automatically set when document is updated
    private LocalDateTime updatedAt;

    // --- Inner Classes for Nested Data ---

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionHistory {
        private String questionId;
        @Builder.Default
        private LocalDateTime answeredAt = LocalDateTime.now();
        private boolean correct;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ConceptMastery {
        private String concept;
        @Builder.Default
        private int masteryLevel = 0;
        @Builder.Default
        private int interval = 1;
        @Builder.Default
        private int repetition = 0;
        @Builder.Default
        private double efactor = 2.5;
        @Builder.Default
        private LocalDateTime nextReviewAt = LocalDateTime.now();
    }
}