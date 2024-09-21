import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/security/guards/jwt-auth.guard'
import { RolesGuard } from 'src/security/guards/roles.guard'
import { Roles } from 'src/decorators/roles.decorator'
import { Role } from 'src/enums/Role'
import { ValidationPipe } from 'src/pipes/validation.pipe'
import { ReqUser } from 'src/decorators/req-user.decorator'
import { users } from '@prisma/client'
import { BlogService } from './blog.service'
import { CreateBlogMessageDto } from './dto/create-blog-message.dto'
import { UpdateBlogMessageDto } from './dto/update-blog-message.dto'

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Post()
  async create(
    @ReqUser() user: users,
    @Body(new ValidationPipe()) createBlogMessageDto: CreateBlogMessageDto,
  ) {
    return this.blogService.create(createBlogMessageDto, user.id)
  }

  @Get()
  findAll() {
    return this.blogService.findAll()
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Get('@me')
  findAllMe(@ReqUser() user: users) {
    return this.blogService.findAll(user.id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get(':id_user')
  findOne(@Param('id_user', ParseIntPipe) userId: number) {
    return this.blogService.findOne(userId)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Patch(':id_message')
  updateMe(
    @Param('id_message', ParseIntPipe) idMessage: number,
    @ReqUser() user: users,
    @Body(new ValidationPipe()) updateBlogMessageDto: UpdateBlogMessageDto,
  ) {
    return this.blogService.update(idMessage, user.id, updateBlogMessageDto)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Delete(':id_message')
  delete(
    @Param('id_message', ParseIntPipe) idMessage: number,
    @ReqUser() user: users,
  ) {
    return this.blogService.delete(idMessage, user.id)
  }
}
