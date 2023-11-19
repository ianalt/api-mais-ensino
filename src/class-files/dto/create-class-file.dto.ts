import { FileType } from '../enums/file-type.enum';

export class CreateClassFileDto {
  file: Express.Multer.File[];
  fileType: FileType;
}
