import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/category.entity';
import { Topic } from './topic.entity';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';

@Module({
  providers: [TopicsService],
  imports: [TypeOrmModule.forFeature([Topic, Category])],
  controllers: [TopicsController],
})
export class TopicsModule {}
