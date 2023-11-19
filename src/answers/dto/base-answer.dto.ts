import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseUserDto } from 'src/users/dtos/base-user.dto';

export class BaseAnswerDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  verified: boolean;

  @Expose()
  content: string;

  @Expose()
  @Type(() => BaseUserDto)
  @ValidateNested()
  verifiedBy: BaseUserDto;
}
