@Service
@RequiredArgsConstructor
public class JwtService {

    @Value("${karo.jwt.secret}")
    private String secret;

    @Value("${karo.jwt.access-token-expiry}")
    private long accessTokenExpiry;

    @Value("${karo.jwt.refresh-token-expiry}")
    private long refreshTokenExpiry;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    public String generateAccessToken(User user) {
        return Jwts.builder()
            .subject(user.getEmail())
            .claim("role", user.getRole().name())
            .claim("userId", user.getId().toString())
            .claim("fullName", user.getFullName())
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + accessTokenExpiry))
            .signWith(getSigningKey())
            .compact();
    }

    public String generateRefreshToken(User user) {
        return Jwts.builder()
            .subject(user.getEmail())
            .claim("type", "refresh")
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + refreshTokenExpiry))
            .signWith(getSigningKey())
            .compact();
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    public boolean isTokenValid(String token, UserDetails user) {
        final String email = extractEmail(token);
        return email.equals(user.getUsername()) &&
               !extractAllClaims(token).getExpiration().before(new Date());
    }
}
