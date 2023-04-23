import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async signIn(@Request() req) {
    const currentUser: User = req.user;

    const signedInUser = await this.authService.signIn(currentUser);

    if (!signedInUser)
      throw new UnauthorizedException(
        'Não foi possível realizar seu login. Tente novamente.',
      );

    return signedInUser;
  }

  @Post('/sign-up')
  async signUp(@Body() body: SignUpDto) {
    const { cpf, email } = body.user;

    const cpfBeingUsed = await this.usersService.findByCpf(cpf);
    const emailBeingUsed = await this.usersService.findByEmail(email);

    if (cpfBeingUsed && emailBeingUsed)
      throw new UnprocessableEntityException(
        'Ambos CPF e e-mail providos já estão sendo utilizados. Digite um CPF e um e-mail válidos.',
      );

    if (!emailBeingUsed && cpfBeingUsed)
      throw new UnprocessableEntityException(
        'O CPF provido já está sendo utilizado. Digite um CPF válido.',
      );

    if (!cpfBeingUsed && emailBeingUsed)
      throw new UnprocessableEntityException(
        'O e-mail provido já está sendo utilizado. Digite um e-mail válido.',
      );

    const newUser = await this.authService.signUp(body);

    if (!newUser)
      throw new UnprocessableEntityException(
        'Um erro surgiu enquanto o cadastro era realizado. Por favor, tente novamente.',
      );

    return newUser;
  }
}
