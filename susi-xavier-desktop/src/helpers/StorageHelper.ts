import { Tokens } from "@/interfaces/Login"

export function storageTokens(tokens: Tokens) {
  localStorage.setItem('tokens', JSON.stringify(tokens))
}

export function storageUser(user: User) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function getTokens(): Tokens | null {
  const tokens = localStorage.getItem('tokens')

  if (!tokens) {
    return null
  }

  return JSON.parse(tokens)
}

export function getUser(): User | null {
  const user = localStorage.getItem('user')

  if (!user) {
    return null
  }

  return JSON.parse(user)
}

export function removeTokens() {
  localStorage.removeItem('tokens')
}