package com.karo.auth.dto;

import lombok.Builder;
import java.util.UUID;

@Builder
public record AuthResponse(
    String accessToken,
    String refreshToken,
    String role,           // "ADMIN" | "STUDENT" | "CLIENT"
    String fullName,
    UUID   userId,
    String redirectTo     // "/admin/dashboard" | "/student/dashboard" | "/client/dashboard"
) {}
