package com.backend_java.Migration.services;

import lombok.Builder;
import lombok.Data;
import java.util.Map;

public interface ImpactService {
    
    @Data
    @Builder
    class ImpactResult {
        private int baseXP;
        private Map<String, String> multipliers;
        private int totalXP;
    }

    ImpactResult calculate(String questionType, String lessonLevel, int streakCount, boolean isFirstAttempt);
}
