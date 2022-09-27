import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationInfo } from './education-info.entity';
import { EducationInfoService } from './education-info.service';
import { EducationInfoController } from './education-info.controller';
import { User } from 'src/users/user.entity';

@Module({
  providers: [EducationInfoService],
  imports: [TypeOrmModule.forFeature([EducationInfo, User])],
  controllers: [EducationInfoController],
  exports: [EducationInfoService],
})
export class EducationInfoModule {}
