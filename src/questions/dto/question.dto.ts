import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { AnswerDto } from 'src/answers/dto/answer.dto';
import { BaseUserDto } from 'src/users/dtos/base-user.dto';

export class QuestionDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  active: boolean;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  @Type(() => AnswerDto)
  @ValidateNested({ each: true })
  answers: AnswerDto[];

  @Expose()
  @Type(() => BaseUserDto)
  @ValidateNested({ each: true })
  createdBy: BaseUserDto;
}
