import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/subjects/subject.entity';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';

@Module({
  providers: [SubjectsService],
  imports: [TypeOrmModule.forFeature([Subject])],
  controllers: [SubjectsController],
})
export class SubjectsModule {}
