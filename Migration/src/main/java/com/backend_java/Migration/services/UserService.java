package com.backend_java.Migration.services;

import com.backend_java.Migration.dto.AuthResponse;
import com.backend_java.Migration.models.User;
import java.util.Map;

public interface UserService {
    // Auth & Profile
    AuthResponse register(User user);
    AuthResponse login(String email, String password);
    User getProfile(String userId);
    User updateProfile(String userId, Map<String, Object> updates);

    // Leaderboard & Gamification
    Map<String, Object> getLeaderboard(String currentUserId);
    void updateXpAndStreak(String userId, int xpEarned);
}
