import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { blog_messages } from '@prisma/client'
import { PrismaUtil } from 'src/utils/prisma.util'
import { UpdateBlogMessageDto } from './dto/update-blog-message.dto'
import { CreateBlogMessageDto } from './dto/create-blog-message.dto'

@Injectable()
export class BlogService {
  constructor(
    private prisma: PrismaService,
    private prismaUtil: PrismaUtil,
  ) {}

  async create(createBlogMessageDto: CreateBlogMessageDto, idUser: number) {
    return this.prismaUtil.performOperation(
      'Não foi possível cadastrar a mensagem',
      async () => {
        return this.prisma.blog_messages.create({
          data: { ...createBlogMessageDto, id_user: idUser },
        })
      },
    )
  }

  async findAll(idUser?: number): Promise<blog_messages[]> {
    return this.prismaUtil.performOperation(
      'Não foi possível buscar pelas mensagens',
      async () => {
        return await this.prisma.blog_messages.findMany({
          where: idUser ? { id_user: idUser } : {},
        })
      },
    )
  }

  async findOne(idUser: number) {
    return this.prismaUtil.performOperation(
      'Não foi possível buscar a mensagem',
      async () => {
        return this.prisma.blog_messages.findFirst({
          where: { id_user: idUser },
        })
      },
    )
  }

  async update(
    idMessage: number,
    idUser: number,
    updateBlogMessageDto: UpdateBlogMessageDto,
  ) {
    return this.prismaUtil.performOperation(
      'Não foi porrível atualizar a mensagem',
      async () => {
        return this.prisma.blog_messages.update({
          where: { id_message: idMessage, id_user: idUser },
          data: updateBlogMessageDto,
        })
      },
    )
  }

  async delete(idMessage: number, idUser: number) {
    return this.prismaUtil.performOperation(
      'Não foi possível deletar a mensagem',
      async () => {
        return this.prisma.blog_messages.delete({
          where: { id_message: idMessage, id_user: idUser },
        })
      },
    )
  }
}
