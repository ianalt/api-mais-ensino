import { PartialType } from '@nestjs/swagger';
import { CreateClassFileDto } from './create-class-file.dto';

export class UpdateClassFileDto extends PartialType(CreateClassFileDto) {}
