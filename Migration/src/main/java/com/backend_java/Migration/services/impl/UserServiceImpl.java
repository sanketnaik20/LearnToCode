package com.backend_java.Migration.services.impl;

import com.backend_java.Migration.dto.AuthResponse;
import com.backend_java.Migration.models.User;
import com.backend_java.Migration.repositories.UserRepository;
import com.backend_java.Migration.services.JwtService;
import com.backend_java.Migration.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public AuthResponse register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent() || 
            userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("User already exists with this email or username");
        }
        
        // Secure password encryption
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        
        // Generate token
        String token = jwtService.generateToken(savedUser);
        
        return AuthResponse.builder()
                .token(token)
                .user(savedUser)
                .build();
    }

    @Override
    public AuthResponse login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Identity not found. Please register."));
        
        // Secure password verification
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Security credentials invalid.");
        }

        // Generate token
        String token = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .user(user)
                .build();
    }

    @Override
    public User getProfile(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User updateProfile(String userId, Map<String, Object> updates) {
        User user = getProfile(userId);

        if (updates.containsKey("username")) {
            String newUsername = (String) updates.get("username");
            if (!newUsername.equals(user.getUsername()) && 
                 userRepository.findByUsername(newUsername).isPresent()) {
                throw new RuntimeException("Username already taken by another architect.");
            }
            user.setUsername(newUsername);
        }

        if (updates.containsKey("collegeName")) user.setCollegeName((String) updates.get("collegeName"));
        if (updates.containsKey("leetcodeUsername")) user.setLeetcodeUsername((String) updates.get("leetcodeUsername"));

        return userRepository.save(user);
    }

    @Override
    public Map<String, Object> getLeaderboard(String currentUserId) {
        // Fetch top 50 users sorted by XP
        List<User> topUsers = userRepository.findAll(Sort.by(Sort.Direction.DESC, "xp"))
                .stream().limit(50).toList();

        List<Map<String, Object>> userList = topUsers.stream().map(u -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", u.getId());
            map.put("username", u.getUsername());
            map.put("xp", u.getXp());
            map.put("streakCount", u.getStreakCount());
            map.put("collegeName", u.getCollegeName());
            map.put("status", calculateStatus(u.getXp()));
            map.put("isCurrentUser", u.getId().equals(currentUserId));
            return map;
        }).collect(Collectors.toList());

        // Ranking logic
        User currentUser = getProfile(currentUserId);
        long totalUsers = userRepository.count();
        long countHigher = topUsers.stream().filter(u -> u.getXp() > currentUser.getXp()).count(); 
        // Note: For real scale, this would be a repository count query
        
        long userRank = countHigher + 1;
        int percentile = (int) Math.max(1, Math.ceil(((double) userRank / totalUsers) * 100));
        String percentileString = (percentile > 50) ? "Bottom " + (100 - percentile) + "%" : "Top " + percentile + "%";

        Map<String, Object> response = new HashMap<>();
        response.put("users", userList);
        Map<String, Object> userStats = new HashMap<>();
        userStats.put("rank", userRank);
        userStats.put("percentile", percentileString);
        userStats.put("totalUsers", totalUsers);
        response.put("userStats", userStats);

        return response;
    }

    @Override
    public void updateXpAndStreak(String userId, int xpEarned) {
        User user = getProfile(userId);
        user.setXp(user.getXp() + xpEarned);

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime lastActive = user.getLastActiveAt();
        
        if (lastActive != null) {
            long daysBetween = ChronoUnit.DAYS.between(lastActive.toLocalDate(), now.toLocalDate());
            if (daysBetween == 1) {
                user.setStreakCount(user.getStreakCount() + 1);
            } else if (daysBetween > 1) {
                user.setStreakCount(1);
            }
        } else {
            user.setStreakCount(1);
        }
        
        user.setLastActiveAt(now);
        userRepository.save(user);
    }

    private String calculateStatus(int xp) {
        if (xp >= 5000) return "PRO_LOGICIST";
        if (xp >= 1000) return "KERNEL_CONTRIBUTOR";
        return "JUNIOR_ARCHITECT";
    }
}
