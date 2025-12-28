package com.backend_java.Migration.repositories;

import com.backend_java.Migration.models.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface QuestionRepository extends MongoRepository<Question, String> {
    List<Question> findByLessonId(String lessonId);
}
