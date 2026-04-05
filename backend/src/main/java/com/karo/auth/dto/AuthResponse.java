@Builder
public record AuthResponse(
    String accessToken,
    String refreshToken,
    String role,           // "ADMIN" | "STUDENT" | "CLIENT"
    String fullName,
    UUID   userId,
    String redirectTo     // "/admin/dashboard" | "/student/dashboard" | "/client/dashboard"
) {}
