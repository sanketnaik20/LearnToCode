package com.backend_java.Migration.services.impl;

import com.backend_java.Migration.models.Problem;
import com.backend_java.Migration.repositories.ProblemRepository;
import com.backend_java.Migration.services.ProblemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProblemServiceImpl implements ProblemService {
    private final ProblemRepository problemRepository;
    private final RestTemplate restTemplate;

    @Override
    public List<Problem> getAllProblems() {
        return problemRepository.findAll(Sort.by(Sort.Direction.ASC, "order"));
    }

    @Override
    public Problem getProblemBySlug(String slug) {
        return problemRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Problem not found with slug: " + slug));
    }

    @Override
    @SuppressWarnings("unchecked")
    public Map<String, Object> getLeetCodeStats(String username) {
        String[] apis = {
            "https://leetcode-stats-api.herokuapp.com/" + username,
            "https://alfa-leetcode-api.onrender.com/userProfile/" + username
        };

        for (String url : apis) {
            try {
                Map<String, Object> response = restTemplate.getForObject(url, Map.class);
                if (response != null) {
                    // Normalize the response if it's from the second API
                    if (url.contains("onrender")) {
                        return Map.of(
                            "status", "success",
                            "totalSolved", response.get("totalSolved"),
                            "easySolved", response.get("easySolved"),
                            "mediumSolved", response.get("mediumSolved"),
                            "hardSolved", response.get("hardSolved")
                        );
                    }
                    return response;
                }
            } catch (Exception e) {
                log.warn("LeetCode API failed for URL: {}. Error: {}", url, e.getMessage());
            }
        }
        throw new RuntimeException("Could not fetch LeetCode statistics.");
    }
}
