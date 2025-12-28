package com.backend_java.Migration.repositories;

import com.backend_java.Migration.models.Lesson;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface LessonRepository extends MongoRepository<Lesson, String> {
    Optional<Lesson> findBySlug(String slug);
}
