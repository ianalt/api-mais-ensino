import { IsBoolean } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class UpdateFullUserDto extends UpdateUserDto {
  @IsBoolean()
  active: boolean;
}
