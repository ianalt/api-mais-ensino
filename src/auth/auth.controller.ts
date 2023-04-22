import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
    await this.authService.signUp(body);
  }

  @Post('/seeding')
  async seeding(@Body() body: SignUpDto[]) {
    return await this.authService.seeding(body);
  }
}
