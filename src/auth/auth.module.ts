import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AddressesModule } from 'src/addresses/addresses.module';
import { EducationInfoModule } from 'src/education-info/education-info.module';
import { FinancialInfoModule } from 'src/financial-info/financial-info.module';
import { PhoneNumbersModule } from 'src/phone-numbers/phone-numbers.module';
import { TokensModule } from 'src/tokens/tokens.module';
import { UsersModule } from 'src/users/users.module';
import { jwtConfig } from '../config/jwt-config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  imports: [
    AddressesModule,
    PhoneNumbersModule,
    EducationInfoModule,
    FinancialInfoModule,
    UsersModule,
    TokensModule,
    PassportModule,
    JwtModule.registerAsync(jwtConfig),
  ],
  exports: [AuthService],
})
export class AuthModule {}
