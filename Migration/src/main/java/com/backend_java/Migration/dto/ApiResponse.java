package com.backend_java.Migration.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;

    public static <E> ApiResponse<E> success(E data) {
        return ApiResponse.<E>builder()
                .success(true)
                .data(data)
                .build();
    }

    public static <E> ApiResponse<E> error(String message) {
        return ApiResponse.<E>builder()
                .success(false)
                .message(message)
                .build();
    }

    public static <E> ApiResponse<E> error(String message, E data) {
        return ApiResponse.<E>builder()
                .success(false)
                .message(message)
                .data(data)
                .build();
    }
}
