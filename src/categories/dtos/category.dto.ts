import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseSubjectDto } from 'src/subjects/dtos/base-subject.dto';
import { BaseTopicDto } from 'src/topics/dtos/base-topic.dto';

export class CategoryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseSubjectDto)
  subject: BaseSubjectDto;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseTopicDto)
  topics: BaseTopicDto[];
}
