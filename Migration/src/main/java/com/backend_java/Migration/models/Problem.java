package com.backend_java.Migration.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "problems")
public class Problem {
    @Id
    @JsonProperty("_id")
    private String id;

    private String title;

    @Indexed(unique = true)
    private String slug;

    private String description;

    @Builder.Default
    private Difficulty difficulty = Difficulty.EASY;

    @Builder.Default
    private List<String> tags = new ArrayList<>();

    private String leetcodeUrl;
    private String explanation;
    private int order;

    public enum Difficulty {
        EASY, MEDIUM, HARD
    }
}
