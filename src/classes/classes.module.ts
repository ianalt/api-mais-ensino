import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesController } from './classes.controller';
import { Classes } from './classes.entity';
import { ClassesService } from './classes.service';
import { Subject } from 'src/subjects/subject.entity';
import { Category } from 'src/categories/category.entity';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService],
  imports: [TypeOrmModule.forFeature([Classes, Subject, Category])],
  exports: [ClassesService],
})
export class ClassesModule {}
