package com.backend_java.Migration.services.impl;

import com.backend_java.Migration.models.Lesson;
import com.backend_java.Migration.models.Progress;
import com.backend_java.Migration.models.Question;
import com.backend_java.Migration.repositories.LessonRepository;
import com.backend_java.Migration.repositories.ProgressRepository;
import com.backend_java.Migration.repositories.QuestionRepository;
import com.backend_java.Migration.services.LessonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class LessonServiceImpl implements LessonService {

    private final LessonRepository lessonRepository;
    private final QuestionRepository questionRepository;
    private final ProgressRepository progressRepository;

    @Override
    public List<Map<String, Object>> getCurriculumForUser(String userId) {
        List<Lesson> lessons = lessonRepository.findAll(Sort.by(Sort.Direction.ASC, "order"));
        log.info("Fetching curriculum for user {}. Found {} lessons.", userId, lessons.size());
        List<Progress> userProgress = progressRepository.findByUserId(userId);

        return lessons.stream().map(lesson -> {
            Map<String, Object> map = new HashMap<>();
            
            Progress progress = userProgress.stream()
                    .filter(p -> p.getLessonId().equals(lesson.getId()))
                    .findFirst()
                    .orElse(null);

            String status = (progress != null) ? progress.getStatus().name() :
                    (lesson.getOrder() == 0 ? "UNLOCKED" : "LOCKED");

            map.put("id", lesson.getId());
            map.put("_id", lesson.getId()); // Frontend expects _id from Mongoose
            map.put("title", lesson.getTitle());
            map.put("description", lesson.getDescription());
            map.put("slug", lesson.getSlug());
            map.put("type", lesson.getType());
            map.put("level", lesson.getLevel());
            map.put("order", lesson.getOrder());
            map.put("status", status);
            map.put("bestScore", (progress != null) ? progress.getBestScore() : 0);
            
            return map;
        }).collect(Collectors.toList());
    }

    @Override
    public Map<String, Object> getLessonWithQuestions(String slug) {
        Lesson lesson = lessonRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Lesson not found with slug: " + slug));

        List<Question> questions = questionRepository.findByLessonId(lesson.getId());

        // Hide solutions from client
        List<Map<String, Object>> safeQuestions = questions.stream().map(q -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", q.getId());
            map.put("type", q.getType());
            map.put("prompt", q.getPrompt());
            map.put("options", q.getOptions());
            map.put("blocks", q.getBlocks());
            map.put("codeTemplate", q.getCodeTemplate());
            return map;
        }).collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("lesson", lesson);
        response.put("questions", safeQuestions);

        return response;
    }

    @Override
    public void completeLesson(String userId, String lessonId, int score) {
        Lesson lesson = getLessonById(lessonId);

        Progress progress = progressRepository.findByUserIdAndLessonId(userId, lessonId)
                .orElse(Progress.builder()
                        .userId(userId)
                        .lessonId(lessonId)
                        .build());

        progress.setStatus(Progress.Status.COMPLETED);
        progress.setBestScore(Math.max(progress.getBestScore(), score));
        progress.setAttempts(progress.getAttempts() + 1);
        progress.setLastAttemptAt(LocalDateTime.now());
        
        progressRepository.save(progress);

        // Unlock next lesson
        lessonRepository.findAll(Sort.by(Sort.Direction.ASC, "order")).stream()
                .filter(l -> l.getOrder() == lesson.getOrder() + 1)
                .findFirst()
                .ifPresent(nextLesson -> {
                    if (progressRepository.findByUserIdAndLessonId(userId, nextLesson.getId()).isEmpty()) {
                        progressRepository.save(Progress.builder()
                                .userId(userId)
                                .lessonId(nextLesson.getId())
                                .status(Progress.Status.UNLOCKED)
                                .build());
                    }
                });
    }

    @Override
    public Lesson getLessonById(String lessonId) {
        return lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found with id: " + lessonId));
    }
}
