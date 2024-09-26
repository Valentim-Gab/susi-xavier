import { environment } from '@/environments/environment'
import {
  removeTokens,
  storageTokens,
  storageUser,
} from '@/helpers/StorageHelper'
import { Login } from '@/interfaces/Login'
import { HttpStatusCode } from 'axios'
import axiosInterceptor from './interceptors/Axios'
import { ResReturn } from '@/interfaces/ResReturn'

export class AuthService {
  async signIn(login: Login): Promise<boolean> {
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

      if (!data.tokens || !data.user) {
        return false
      }

      storageTokens(data.tokens)
      storageUser(data.user)

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

      if (!res || res.status !== HttpStatusCode.Ok) {
        return false
      }

      return true
    } catch (error) {
      return false
    }
  }

  async sendVerifyEmail(): Promise<boolean> {
    const url = `${environment.apiUrl}/send-verify-email`

    try {
      const res = await axiosInterceptor.post(url)

      if (!res || res.status !== HttpStatusCode.Created) {
        return false
      }

      return true
    } catch (error) {
      return false
    }
  }

  async verifyEmail(token: string): Promise<boolean> {
    const url = `${environment.apiUrl}/confirm/${token}`

    try {
      const res = await fetch(url, {
        method: 'PATCH',
      })

      if (!res || !res.ok) {
        return false
      }

      return true
    } catch (error) {
      return false
    }
  }

  async sendRecoverEmail(email: string): Promise<ResReturn> {
    const url = `${environment.apiUrl}/send-recover-email`

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!res || !res.ok) {
        const data = await res.json()

        return {
          success: false,
          message: data.message ?? 'Erro ao enviar email',
        }
      }

      const data = await res.json()

      return { success: true, message: data.message }
    } catch (error) {
      return { success: false, message: 'Erro ao enviar email' }
    }
  }

  async resetPassword(
    password: string,
    confirmationPassword: string,
    token: string
  ): Promise<ResReturn> {
    const url = `${environment.apiUrl}/reset-password/${token}`

    try {
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          password_confirmation: confirmationPassword,
        }),
      })

      const data = await res.json()

      if (!res || !res.ok) {
        return {
          success: false,
          message: 'Erro ao resetar senha',
        }
      }

      return {
        success: true,
        message: data.message ?? 'Senha resetada com sucesso!',
      }
    } catch (error) {
      return { success: false, message: 'Erro ao resetar senha' }
    }
  }
}
