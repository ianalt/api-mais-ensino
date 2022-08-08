import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dtos/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @Post('/sign-up')
  async signUp(@Body() body: SignUpDTO) {
    return await this.authService.signUp(body);
  }

  @Post('/seeding')
  async seeding(@Body() body: SignUpDTO[]) {
    return await this.authService.seeding(body);
  }
}
