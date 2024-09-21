import { HttpStatusCode } from 'axios'
import { Message } from '@/interfaces/Blog'
import axiosInterceptor from './interceptors/Axios'

export class BlogService {
  async getAll(): Promise<Message[] | null> {
    try {
      const res = await axiosInterceptor('/blog/@me')
      console.log(res)

      if (!res || res.status != HttpStatusCode.Ok) {
        return null
      }

      return res.data
    } catch (error) {
      return null
    }
  }

  async create(message: Message): Promise<Boolean> {
    try {
      const res = await axiosInterceptor.post('/blog', message)
      console.log(res)

      if (!res || res.status != HttpStatusCode.Created) {
        return false
      }

      return true
    } catch (error) {
      return false
    }
  }
}
