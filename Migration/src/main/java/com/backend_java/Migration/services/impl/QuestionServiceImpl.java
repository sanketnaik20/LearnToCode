package com.backend_java.Migration.services.impl;

import com.backend_java.Migration.models.Question;
import com.backend_java.Migration.repositories.QuestionRepository;
import com.backend_java.Migration.services.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;

    @Override
    public List<Question> getQuestionsByLessonId(String lessonId) {
        return questionRepository.findByLessonId(lessonId);
    }

    @Override
    public Question getQuestionById(String id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));
    }
}
