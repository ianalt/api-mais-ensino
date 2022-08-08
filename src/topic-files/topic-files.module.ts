import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicFile } from './topic-file.entity';
import { TopicFilesService } from './topic-files.service';
import { TopicFilesController } from './topic-files.controller';

@Module({
  providers: [TopicFilesService],
  imports: [TypeOrmModule.forFeature([TopicFile])],
  controllers: [TopicFilesController],
})
export class TopicFilesModule {}
