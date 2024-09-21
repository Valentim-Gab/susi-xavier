export interface Login {
  username: string
  password: string
}

export interface Tokens {
  access_token: string
  refresh_token: string
}

export interface LoginResponse {
  user: User
  tokens: Tokens
}