import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesController } from './classes.controller';
import { Classes } from './classes.entity';
import { ClassesService } from './classes.service';
import { Subject } from 'src/subjects/subject.entity';
import { Category } from 'src/categories/category.entity';
import { User } from 'src/users/user.entity';
import { ClassFilesModule } from 'src/class-files/class-files.module';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService],
  imports: [
    TypeOrmModule.forFeature([Classes, Subject, Category, User]),
    ClassFilesModule,
  ],
  exports: [ClassesService],
})
export class ClassesModule {}
