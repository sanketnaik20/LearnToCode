package com.backend_java.Migration.services.impl;

import com.backend_java.Migration.services.ImpactService;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class ImpactServiceImpl implements ImpactService {
    
    private static final Map<String, Integer> BASE_XP = Map.of(
        "MCQ", 10,
        "FILL_IN_BLANK", 15,
        "PARSONS", 25
    );

    private static final Map<String, Double> DIFFICULTY_MULTIPLIER = Map.of(
        "BEGINNER", 1.0,
        "INTERMEDIATE", 1.5,
        "ADVANCED", 2.0,
        "MASTER", 2.5
    );

    @Override
    public ImpactResult calculate(String questionType, String lessonLevel, int streakCount, boolean isFirstAttempt) {
        int baseXP = BASE_XP.getOrDefault(questionType, 10);
        
        double streakMultiplier = Math.min(2.0, 1 + (streakCount * 0.05));
        double difficultyMultiplier = DIFFICULTY_MULTIPLIER.getOrDefault(lessonLevel.toUpperCase(), 1.0);
        double firstTimeMultiplier = isFirstAttempt ? 1.5 : 0.75;

        double totalXP = baseXP * streakMultiplier * difficultyMultiplier * firstTimeMultiplier;
        
        if (Double.isNaN(totalXP) || totalXP < 0) totalXP = 10;
        
        int finalXP = (int) Math.round(totalXP);

        return ImpactResult.builder()
                .baseXP(baseXP)
                .multipliers(Map.of(
                    "streak", String.format("%.2f", streakMultiplier),
                    "difficulty", String.format("%.2f", difficultyMultiplier),
                    "firstTime", String.format("%.2f", firstTimeMultiplier)
                ))
                .totalXP(finalXP)
                .build();
    }
}
