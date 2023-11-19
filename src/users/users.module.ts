import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesModule } from '../addresses/addresses.module';
import { EducationInfoModule } from '../education-info/education-info.module';
import { FinancialInfoModule } from '../financial-info/financial-info.module';
import { PhoneNumbersModule } from '../phone-numbers/phone-numbers.module';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([User]),
    AddressesModule,
    EducationInfoModule,
    FinancialInfoModule,
    PhoneNumbersModule,
    TokensModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
