package com.backend_java.Migration.services;

import com.backend_java.Migration.models.Question;
import java.util.List;

public interface QuestionService {
    List<Question> getQuestionsByLessonId(String lessonId);
    Question getQuestionById(String id);
}
