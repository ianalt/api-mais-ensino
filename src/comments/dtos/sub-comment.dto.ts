import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CommentFileDto } from 'src/comment-files/dtos/comment-file.dto';
import { BaseUserDto } from 'src/users/dtos/base-user.dto';
import { BaseCommentDto } from './base-comment.dto';
import { CommentDto } from './comment.dto';

export class SubCommentDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  content: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseUserDto)
  user: BaseUserDto;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comment: BaseCommentDto;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CommentFileDto)
  commentFiles: CommentFileDto[];
}
