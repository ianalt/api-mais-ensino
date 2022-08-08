import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialInfo } from './financial-info.entity';
import { FinancialInfoService } from './financial-info.service';
import { FinancialInfoController } from './financial-info.controller';
import { User } from 'src/users/user.entity';

@Module({
  providers: [FinancialInfoService],
  imports: [TypeOrmModule.forFeature([FinancialInfo, User])],
  controllers: [FinancialInfoController],
  exports: [FinancialInfoService],
})
export class FinancialInfoModule {}
