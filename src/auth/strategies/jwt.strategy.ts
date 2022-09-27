import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import appConfig from 'src/config/app.config';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from '../types/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig().jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    const userID = payload.sub;
    const user = await this.usersService.findByID(userID);

    return {
      userID: payload.sub,
      email: payload.email,
      ...user,
    };
  }
}
