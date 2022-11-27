import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { User } from 'src/users/user.entity';

export class CreateTokenDto {
  @IsString()
  content: string;

  @Type(() => User)
  user: User;
}
