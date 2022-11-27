import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CommentFileDto } from 'src/comment-files/dtos/comment-file.dto';
import { BaseUserDto } from 'src/users/dtos/base-user.dto';

export class BaseSubCommentDto {
  @Expose()
  id: number;

  @Expose()
  content: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseUserDto)
  user: BaseUserDto;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CommentFileDto)
  commentFiles: CommentFileDto[];
}
