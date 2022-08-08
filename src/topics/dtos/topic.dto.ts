import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseCategoryDTO } from 'src/categories/dtos/base-category.dto';
import { CommentDTO } from 'src/comments/dtos/comment.dto';
import { TopicFileDTO } from 'src/topic-files/dtos/topic-file.dto';

export class TopicDTO {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  videoUrl: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseCategoryDTO)
  category: BaseCategoryDTO;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => TopicFileDTO)
  topicFiles: TopicFileDTO[];

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CommentDTO)
  comments: CommentDTO[];
}
