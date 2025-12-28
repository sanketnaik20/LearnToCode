package com.backend_java.Migration.services;

import com.backend_java.Migration.models.Problem;
import java.util.List;
import java.util.Map;

public interface ProblemService {
    List<Problem> getAllProblems();
    Problem getProblemBySlug(String slug);
    Map<String, Object> getLeetCodeStats(String username);
}
