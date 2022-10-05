import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Comment } from './comment.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  providers: [CommentsService],
  imports: [TypeOrmModule.forFeature([Comment, User])],
  controllers: [CommentsController],
})
export class CommentsModule {}
