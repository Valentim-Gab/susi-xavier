import { environment } from '@/environments/environment'
import { removeTokens, storageTokens } from '@/helpers/StorageHelper'
import { Login } from '@/interfaces/Login'
import axiosInterceptor from './interceptors/Axios'

export class AuthService {
  async signIn(login: Login): Promise<Boolean> {
    const url = `${environment.apiUrl}/login`

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login),
      })

      if (!res || !res.ok) {
        return false
      }

      const data = await res.json()

      if (!data.tokens) {
        return false
      }

      storageTokens(data.tokens)

      return true
    } catch (error) {
      return false
    }
  }

  signOut(): Boolean {
    try {
      removeTokens()
      return true
    } catch (error) {
      return false
    }
  }

  async checkAuth(): Promise<boolean> {
    const url = `${environment.apiUrl}/check`

    try {
      const res = await axiosInterceptor(url, {
        method: 'HEAD',
      })

      console.log(res)

      return true
    } catch (error) {
      console.error('Erro ao verificar o token:', error)

      return false
    }
  }
}
