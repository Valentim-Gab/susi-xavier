import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { users } from '@prisma/client'
import { UserService } from 'src/routers/user/user.service'
import { BCryptService } from '../private/bcrypt.service'
import { JwtPayload, JwtSign } from './auth.interface'
import { ConfigService } from '@nestjs/config'
import { AuthConstants } from 'src/constants/auth.constant'
import * as jwt from 'jsonwebtoken'
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer'
import { ChangePasswordDto } from './dtos/change-password.dto'

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private jwtService: JwtService,
    private bcrypt: BCryptService,
    private config: ConfigService,
    private mailerService: MailerService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(username)

    if (user && (await this.bcrypt.validate(user.password, pass))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user

      return result
    }

    return null
  }

  public jwtSign(data: users): JwtSign {
    const payload: JwtPayload = {
      sub: data.id,
      username: data.email,
      role: data.role,
    }

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.getRefreshToken(payload.sub),
    }
  }

  private getRefreshToken(sub: number): string {
    return this.jwtService.sign(
      { sub },
      {
        secret: this.config.get('refreshSecret'),
        expiresIn: AuthConstants.REFRESH_TOKEN_EXPIRES,
      },
    )
  }

  async confirmEmail(confirmationToken: string): Promise<void> {
    try {
      const decoded = jwt.verify(confirmationToken, this.config.get('secret'))

      if (!decoded.email) {
        throw new NotFoundException('Token inválido')
      }

      const user = await this.userService.findByEmail(decoded.email)

      return await this.userService.update(user.id, { verified_email: true })
    } catch (error) {
      throw new NotFoundException('Token inválido')
    }
  }

  async sendVerifyEmail(email: string): Promise<void> {
    const confirmationToken = jwt.sign(
      { email: email },
      this.config.get('secret'),
      { expiresIn: '1h' },
    )

    const mail = {
      to: email,
      from: 'noreply@application.com',
      subject: 'Email de confirmação',
      template: 'email-confirmation',
      context: {
        token: confirmationToken,
      },
    }

    await this.mailerService.sendMail(mail)
  }

  async sendRecoverPasswordEmail(email: string) {
    const user = await this.userService.findByEmail(email)

    if (!user) {
      throw new NotFoundException('Não há usuário cadastrado com esse email.')
    }

    const recoverToken = jwt.sign(
      { email: user.email },
      this.config.get('secret'),
      { expiresIn: '1h' },
    )

    const mail: ISendMailOptions = {
      to: user.email,
      from: 'noreply@application.com',
      subject: 'Recuperação de senha',
      template: 'recover-password',
      context: {
        token: recoverToken,
      },
    }

    return await this.mailerService.sendMail(mail)
  }

  async resetPassword(
    recoverToken: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { password, password_confirmation: PasswordConfirmation } =
      changePasswordDto

    if (password != PasswordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem')
    }

    const decoded = jwt.verify(recoverToken, this.config.get('secret'))

    if (!decoded.email) {
      throw new NotFoundException('Token inválido')
    }

    const user = await this.userService.findByEmail(decoded.email)

    return await this.userService.updatePassword(user.id, password)
  }
}
