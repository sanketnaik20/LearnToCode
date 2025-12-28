package com.backend_java.Migration.repositories;

import com.backend_java.Migration.models.Problem;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface ProblemRepository extends MongoRepository<Problem, String> {
    Optional<Problem> findBySlug(String slug);
}
