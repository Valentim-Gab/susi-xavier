import { IsNotEmpty, IsString } from 'class-validator'

export class CreateBlogMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string
}
