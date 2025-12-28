package com.backend_java.Migration.services;

import java.util.Map;

public interface ProgressService {
    Map<String, Object> validateAnswer(String userId, String questionId, Object answer);
}
