package com.backend_java.Migration.services.impl;

import com.backend_java.Migration.services.SrsService;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class SrsServiceImpl implements SrsService {
    
    @Override
    public SrsStats calculateNextReview(int interval, int repetition, double efactor, int quality) {
        int newInterval = interval;
        int newRepetition = repetition;
        double newEfactor = efactor;

        if (quality >= 3) {
            if (newRepetition == 0) {
                newInterval = 1;
            } else if (newRepetition == 1) {
                newInterval = 6;
            } else {
                newInterval = (int) Math.round(interval * efactor);
            }
            newRepetition++;
        } else {
            newRepetition = 0;
            newInterval = 1;
        }

        newEfactor = newEfactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        if (newEfactor < 1.3) newEfactor = 1.3;

        return SrsStats.builder()
                .interval(newInterval)
                .repetition(newRepetition)
                .efactor(newEfactor)
                .nextReviewAt(LocalDateTime.now().plusDays(newInterval))
                .build();
    }
}
