@Entity
@Table(name = "users")
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "full_name")
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "user_role")
    @Type(PostgreSQLEnumType.class)
    private UserRole role;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "user_status")
    @Type(PostgreSQLEnumType.class)
    private UserStatus status;

    @Column(name = "email_verified")
    private boolean emailVerified;

    @Column(name = "refresh_token_hash")
    private String refreshTokenHash;

    // UserDetails implementation
    @Override public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }
    @Override public String getPassword() { return passwordHash; }
    @Override public String getUsername() { return email; }
    @Override public boolean isAccountNonLocked() { return status != UserStatus.SUSPENDED; }
    @Override public boolean isEnabled() { return emailVerified; }
}