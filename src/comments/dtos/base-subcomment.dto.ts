import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CommentFileDTO } from 'src/comment-files/dtos/comment-file.dto';
import { BaseUserDTO } from 'src/users/dtos/base-user.dto';

export class BaseSubCommentDTO {
  @Expose()
  id: number;

  @Expose()
  content: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseUserDTO)
  user: BaseUserDTO;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CommentFileDTO)
  commentFiles: CommentFileDTO[];
}
