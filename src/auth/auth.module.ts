import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TokensModule } from 'src/tokens/tokens.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AddressesModule } from 'src/addresses/addresses.module';
import { PhoneNumbersModule } from 'src/phone-numbers/phone-numbers.module';
import { EducationInfoModule } from 'src/education-info/education-info.module';
import { FinancialInfoModule } from 'src/financial-info/financial-info.module';
import { jwtConfig } from '../config/jwt-config';

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
