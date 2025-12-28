package com.backend_java.Migration.dto;

import lombok.Data;

@Data
public class ProgressRequest {
    private String questionId;
    private Object answer;
}
