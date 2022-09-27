import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CategoriesController } from './categories.controller';
import { Subject } from 'src/subjects/subject.entity';

@Module({
  providers: [CategoriesService],
  imports: [TypeOrmModule.forFeature([Category, Subject])],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
