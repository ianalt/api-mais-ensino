import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BasicClassInfoDto } from 'src/classes/dto/basic-class-info.dto';

export class FullCategoryInfoDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  active: boolean;

  @Expose()
  name: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BasicClassInfoDto)
  classes: BasicClassInfoDto[];
}
