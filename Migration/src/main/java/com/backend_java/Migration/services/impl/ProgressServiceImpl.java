package com.backend_java.Migration.services.impl;

import com.backend_java.Migration.models.Question;
import com.backend_java.Migration.models.User;
import com.backend_java.Migration.models.Lesson;
import com.backend_java.Migration.repositories.UserRepository;
import com.backend_java.Migration.services.ImpactService;
import com.backend_java.Migration.services.ProgressService;
import com.backend_java.Migration.services.QuestionService;
import com.backend_java.Migration.services.SrsService;
import com.backend_java.Migration.services.UserService;
import com.backend_java.Migration.services.LessonService;
import com.backend_java.Migration.utils.CppValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class ProgressServiceImpl implements ProgressService {
    
    private final QuestionService questionService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final SrsService srsService;
    private final ImpactService impactService;
    private final LessonService lessonService;

    @Override
    public Map<String, Object> validateAnswer(String userId, String questionId, Object answer) {
        Question question = questionService.getQuestionById(questionId);
        Lesson lesson = lessonService.getLessonById(question.getLessonId());
        User user = userService.getProfile(userId);

        boolean isCorrect = false;
        if (question.getType() == Question.QuestionType.MCQ) {
            isCorrect = String.valueOf(answer).equals(String.valueOf(question.getSolution()));
        } else if (question.getType() == Question.QuestionType.FILL_IN_BLANK) {
            isCorrect = CppValidator.validateFillInBlank((String) answer, (String) question.getSolution());
        } else if (question.getType() == Question.QuestionType.PARSONS) {
            isCorrect = CppValidator.validateParsons(answer, question.getSolution());
        }

        // 1. Check if first attempt
        boolean isFirstAttempt = user.getQuestionHistory().stream()
                .noneMatch(h -> h.getQuestionId().equals(questionId));

        // 2. SRS Concept Mastery Update
        if (question.getConcepts() != null) {
            for (String conceptName : question.getConcepts()) {
                User.ConceptMastery concept = user.getConceptMastery().stream()
                        .filter(c -> c.getConcept().equals(conceptName))
                        .findFirst()
                        .orElse(null);

                if (concept == null) {
                    concept = User.ConceptMastery.builder().concept(conceptName).build();
                    user.getConceptMastery().add(concept);
                }

                int quality = isCorrect ? 5 : 0;
                SrsService.SrsStats updatedStats = srsService.calculateNextReview(
                        concept.getInterval(),
                        concept.getRepetition(),
                        concept.getEfactor(),
                        quality
                );

                concept.setInterval(updatedStats.getInterval());
                concept.setRepetition(updatedStats.getRepetition());
                concept.setEfactor(updatedStats.getEfactor());
                concept.setNextReviewAt(updatedStats.getNextReviewAt());
            }
        }

        // 3. XP and Streak
        int xpEarned = 0;
        ImpactService.ImpactResult impactResult = null;
        if (isCorrect) {
            impactResult = impactService.calculate(
                    question.getType().name(),
                    lesson.getLevel().name(),
                    user.getStreakCount(),
                    isFirstAttempt
            );
            xpEarned = impactResult.getTotalXP();
            
            // Re-using UserService to handle the actual streak logic and XP addition
            userService.updateXpAndStreak(userId, xpEarned);
            
            // Also track in history
            if (isFirstAttempt) {
                user.getQuestionHistory().add(User.QuestionHistory.builder()
                        .questionId(questionId)
                        .correct(true)
                        .build());
            }
        }

        userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("isCorrect", isCorrect);
        response.put("xpEarned", xpEarned);
        response.put("streak", user.getStreakCount());
        response.put("isFirstAttempt", isFirstAttempt);
        if (impactResult != null) {
            response.put("multipliers", impactResult.getMultipliers());
        }

        return response;
    }
}
