import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumber } from './phone-number.entity';
import { PhoneNumbersService } from './phone-numbers.service';
import { PhoneNumbersController } from './phone-numbers.controller';
import { User } from 'src/users/user.entity';

@Module({
  providers: [PhoneNumbersService],
  imports: [TypeOrmModule.forFeature([PhoneNumber, User])],
  controllers: [PhoneNumbersController],
  exports: [PhoneNumbersService],
})
export class PhoneNumbersModule {}
