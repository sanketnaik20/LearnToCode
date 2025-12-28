package com.backend_java.Migration.repositories;

import com.backend_java.Migration.models.Progress;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;
import java.util.List;

public interface ProgressRepository extends MongoRepository<Progress, String> {
    List<Progress> findByUserId(String userId);
    Optional<Progress> findByUserIdAndLessonId(String userId, String lessonId);
}
