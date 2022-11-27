import { Expose } from 'class-transformer';
import { Role } from 'src/auth/enums/role.enum';

//TODO basic info user Dto for table
export class BaseUserDto {
  @Expose()
  id: number;

  @Expose()
  role: Role;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;
}
