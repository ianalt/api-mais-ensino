import { IsBoolean, IsEnum } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';
import { UpdateUserDto } from './update-user.dto';

export class UpdateFullUserDto extends UpdateUserDto {
  @IsBoolean()
  active: boolean;
}
