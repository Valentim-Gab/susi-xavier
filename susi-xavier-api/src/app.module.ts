import { Module } from '@nestjs/common'
import { UserModule } from './routers/user/user.module'
import { AuthModule } from './security/auth/auth.module'
import { PrismaModule } from 'nestjs-prisma'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { BlogModule } from './routers/blog/blog.module'

@Module({
  imports: [
    AuthModule,
    UserModule,
    BlogModule,
    PrismaModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
})
export class AppModule {}
