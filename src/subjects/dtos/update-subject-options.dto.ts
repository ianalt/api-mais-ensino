import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseKnowledgeAreaDto } from 'src/knowledge-areas/dtos/base-knowledge-area.dto';
import { BaseUserDto } from 'src/users/dtos/base-user.dto';

export class UpdateSubjectOptionsDto {
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseKnowledgeAreaDto)
  knowledgeAreaOptions: BaseKnowledgeAreaDto[];

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseUserDto)
  teacherOptions: BaseUserDto[];

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseUserDto)
  monitorsOptions: BaseUserDto[];
}
