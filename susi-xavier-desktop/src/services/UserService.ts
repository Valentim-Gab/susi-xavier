import { HttpStatusCode } from 'axios'
import axiosInterceptor from './interceptors/Axios'
import { setAvatar } from '@/stores/AvatarSlice'
import { store } from '@/stores/store'
import { storageUser } from '@/helpers/StorageHelper'

export class UserService {
  async getMe(): Promise<User | null> {
    try {
      const res = await axiosInterceptor('/user/@me')

      if (!res || res.status !== HttpStatusCode.Ok) {
        return null
      }

      const data = res.data

      storageUser(data)

      return data
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async downloadAvatar() {
    try {
      const res = await axiosInterceptor('/user/@me/avatar', {
        responseType: 'blob',
      })

      console.log(res)

      if (!res || res.status !== HttpStatusCode.Ok) {
        return null
      }

      const blob = URL.createObjectURL(res.data)

      store.dispatch(setAvatar(blob))

      return blob
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async uploadAvatar(file: File) {
    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const res = await axiosInterceptor.patch('/user/@me/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (!res || res.status !== HttpStatusCode.Ok) {
        return false
      }

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async getAvatar() {
    const blob = store.getState().avatar

    if (blob) {
      return blob
    }

    const service = new UserService()

    return await service.downloadAvatar()
  }
}
