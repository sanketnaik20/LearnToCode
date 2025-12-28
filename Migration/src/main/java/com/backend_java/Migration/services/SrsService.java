package com.backend_java.Migration.services;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

public interface SrsService {
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    class SrsStats {
        private int interval;
        private int repetition;
        private double efactor;
        private LocalDateTime nextReviewAt;
    }

    SrsStats calculateNextReview(int interval, int repetition, double efactor, int quality);
}
