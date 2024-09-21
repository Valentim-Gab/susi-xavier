import { Tokens } from "@/interfaces/Login"

export function storageTokens(tokens: Tokens) {
  localStorage.setItem('tokens', JSON.stringify(tokens))
}

export function getTokens(): Tokens | null {
  const tokens = localStorage.getItem('tokens')

  if (!tokens) {
    return null
  }

  return JSON.parse(tokens)
}

export function removeTokens() {
  localStorage.removeItem('tokens')
}