import { Module } from '@nestjs/common'
import { UserModule } from './routers/user/user.module'
import { AuthModule } from './security/auth/auth.module'
import { PrismaModule } from 'nestjs-prisma'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { BlogModule } from './routers/blog/blog.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { mailerConfig } from './config/mailer.config'

@Module({
  imports: [
    AuthModule,
    UserModule,
    BlogModule,
    PrismaModule.forRoot(),
    MailerModule.forRoot(mailerConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
})
export class AppModule {}
