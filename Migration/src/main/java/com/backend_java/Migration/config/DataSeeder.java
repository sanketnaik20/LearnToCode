package com.backend_java.Migration.config;

import com.backend_java.Migration.models.Lesson;
import com.backend_java.Migration.models.Problem;
import com.backend_java.Migration.models.Question;
import com.backend_java.Migration.repositories.LessonRepository;
import com.backend_java.Migration.repositories.ProblemRepository;
import com.backend_java.Migration.repositories.QuestionRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final LessonRepository lessonRepository;
    private final QuestionRepository questionRepository;
    private final ProblemRepository problemRepository;
    private final ObjectMapper objectMapper;

    @Override
    public void run(String... args) throws Exception {
        try {
            if (lessonRepository.count() > 0) {
                log.info("Database already seeded with curriculum. Skipping...");
                return;
            }

            log.info("Seeding database with C++ curriculum and problems...");

            // 1. Seed Curriculum
            try (InputStream is = new ClassPathResource("curriculum.json").getInputStream()) {
                JsonNode root = objectMapper.readTree(is);
                JsonNode units = root.get("units");

                int globalLessonOrder = 0;

                for (JsonNode unitNode : units) {
                    // Process Lessons in Unit
                    JsonNode lessonsNode = unitNode.get("lessons");
                    for (JsonNode lessonNode : lessonsNode) {
                        // Create Lesson
                        Lesson lesson = Lesson.builder()
                                .title(lessonNode.get("title").asText())
                                .slug(lessonNode.get("slug").asText())
                                .description(lessonNode.get("description").asText())
                                .level(Lesson.DifficultyLevel.valueOf(lessonNode.get("level").asText().toUpperCase()))
                                .order(globalLessonOrder++)
                                .type(Lesson.LessonType.LESSON)
                                .isPublished(true)
                                .build();

                        // Convert content list
                        List<Object> content = objectMapper.convertValue(lessonNode.get("content"), new TypeReference<List<Object>>() {});
                        lesson.setContent(content);

                        Lesson savedLesson = lessonRepository.save(lesson);

                        // Process Questions for Lesson
                        JsonNode questionsNode = lessonNode.get("questions");
                        for (JsonNode qNode : questionsNode) {
                            Question question = Question.builder()
                                    .type(Question.QuestionType.valueOf(qNode.get("type").asText().replace("-", "_").toUpperCase()))
                                    .prompt(qNode.get("prompt").asText())
                                    .lessonId(savedLesson.getId())
                                    .build();
                            
                            // Optional fields
                            if (qNode.has("options")) {
                                question.setOptions(objectMapper.convertValue(qNode.get("options"), new TypeReference<List<String>>() {}));
                            }
                            if (qNode.has("solution")) {
                                 // Handle solution which can be number (MCQ) or string (FILL_IN_BLANK) or list (PARSONS)
                                JsonNode solutionNode = qNode.get("solution");
                                if (solutionNode.isNumber()) {
                                    question.setSolution(solutionNode.asInt());
                                } else if (solutionNode.isArray()) {
                                    question.setSolution(objectMapper.convertValue(solutionNode, new TypeReference<List<Integer>>() {}));
                                } else {
                                    question.setSolution(solutionNode.asText());
                                }
                            }
                            if (qNode.has("blocks")) {
                                question.setBlocks(objectMapper.convertValue(qNode.get("blocks"), new TypeReference<List<String>>() {}));
                            }
                            if (qNode.has("codeTemplate")) {
                                question.setCodeTemplate(qNode.get("codeTemplate").asText());
                            }
                            if (qNode.has("concepts")) {
                                question.setConcepts(objectMapper.convertValue(qNode.get("concepts"), new TypeReference<List<String>>() {}));
                            }
                            
                            questionRepository.save(question);
                        }
                    }
                }
            }

            // 2. Seed Problems
            try (InputStream is = new ClassPathResource("problems.json").getInputStream()) {
                JsonNode problemsNode = objectMapper.readTree(is);
                List<Problem> problems = new ArrayList<>();
                for (JsonNode pNode : problemsNode) {
                    Problem problem = Problem.builder()
                            .title(pNode.get("title").asText())
                            .slug(pNode.get("slug").asText())
                            .description(pNode.get("description").asText())
                            .difficulty(Problem.Difficulty.valueOf(pNode.get("difficulty").asText().toUpperCase()))
                            .leetcodeUrl(pNode.get("leetcodeUrl").asText())
                            .order(pNode.get("order").asInt())
                            .build();
                    
                    if (pNode.has("tags")) {
                        problem.setTags(objectMapper.convertValue(pNode.get("tags"), new TypeReference<List<String>>() {}));
                    }
                    problems.add(problem);
                }
                problemRepository.saveAll(problems);
            }

            log.info("Database seeding completed successfully!");
        } catch (Exception e) {
            log.error("Failed to seed database: {}", e.getMessage(), e);
        }
    }
}
