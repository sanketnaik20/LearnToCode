package com.backend_java.Migration.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "questions")
public class Question {
    @Id
    @JsonProperty("_id")
    private String id;

    private String lessonId; // Matches the ObjectId ref in Node.js

    private QuestionType type; // We use an Enum here for safety

    private String prompt;

    private String codeTemplate; // For fill-in-the-blank questions

    private List<String> blocks;  // For Parsons (ordering) questions

    private List<String> options; // For MCQ choices

    /**
     * In Node.js, this was 'Mixed'. 
     * In Java, we use 'Object' to allow it to be a String, Integer (index), or List.
     */
    private Object solution; 

    private List<String> concepts; // For SRS tagging

    // --- Inner Enum for Question Types ---
    public enum QuestionType {
        MCQ,
        PARSONS,
        FILL_IN_BLANK
    }
}