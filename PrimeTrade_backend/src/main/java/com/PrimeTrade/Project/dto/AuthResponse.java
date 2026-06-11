package com.PrimeTrade.Project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String type;
    private String name;
    private String email;
    private String role;

    public static AuthResponse of(String token, String name, String email, String role) {
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .name(name)
                .email(email)
                .role(role)
                .build();
    }
}
