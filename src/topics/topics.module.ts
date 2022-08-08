import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './topic.entity';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';

@Module({
  providers: [TopicsService],
  imports: [TypeOrmModule.forFeature([Topic])],
  controllers: [TopicsController],
})
export class TopicsModule {}
