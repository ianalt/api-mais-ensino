import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseSubjectDTO } from 'src/subjects/dtos/base-subject.dto';
import { BaseTopicDTO } from 'src/topics/dtos/base-topic.dto';

export class CategoryDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseSubjectDTO)
  subject: BaseSubjectDTO;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseTopicDTO)
  topics: BaseTopicDTO[];
}
