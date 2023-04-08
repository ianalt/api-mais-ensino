import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseCategoryDto } from 'src/categories/dtos/base-category.dto';
import { CommentDto } from 'src/comments/dtos/comment.dto';
import { TopicFileDto } from 'src/topic-files/dtos/topic-file.dto';

export class TopicDto {
  @Expose()
  id: number;

  @Expose()
  active: boolean;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  videoURL: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseCategoryDto)
  category: BaseCategoryDto;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => TopicFileDto)
  topicFiles: TopicFileDto[];

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments: CommentDto[];
}
