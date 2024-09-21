import { Module } from '@nestjs/common'
import { BlogService } from './blog.service'
import { BlogController } from './blog.controller'
import { PrismaService } from 'nestjs-prisma'
import { PrismaUtil } from 'src/utils/prisma.util'

@Module({
  controllers: [BlogController],
  providers: [BlogService, PrismaService, PrismaUtil],
})
export class BlogModule {}
