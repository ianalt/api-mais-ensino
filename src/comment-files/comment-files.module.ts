import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentFile } from './comment-file.entity';
import { CommentFilesService } from './comment-files.service';
import { CommentFilesController } from './comment-files.controller';

@Module({
  providers: [CommentFilesService],
  imports: [TypeOrmModule.forFeature([CommentFile])],
  controllers: [CommentFilesController],
})
export class CommentFilesModule {}
