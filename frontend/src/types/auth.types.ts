export type UserRole = 'ADMIN' | 'STUDENT' | 'CLIENT'
 
export interface LoginRequest {
  email: string
  password: string
  role: UserRole
}
 
export interface RegisterRequest {
  firstName:     string
  lastName:      string
  email:         string
  password:      string
  role:          UserRole
  institutionId: string
}
 
export interface AuthResponse {
  accessToken:  string
  refreshToken: string
  role:         UserRole
  fullName:     string
  userId:       string
  redirectTo:   string
}