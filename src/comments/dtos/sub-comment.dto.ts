import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CommentFileDTO } from 'src/comment-files/dtos/comment-file.dto';
import { BaseUserDTO } from 'src/users/dtos/base-user.dto';
import { BaseCommentDTO } from './base-comment.dto';
import { CommentDTO } from './comment.dto';

export class SubCommentDTO {
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
  @Type(() => BaseUserDTO)
  user: BaseUserDTO;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CommentDTO)
  comment: BaseCommentDTO;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CommentFileDTO)
  commentFiles: CommentFileDTO[];
}
