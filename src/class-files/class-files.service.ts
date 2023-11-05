import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateClassFileDto } from './dto/create-class-file.dto';
import { UpdateClassFileDto } from './dto/update-class-file.dto';
import { FileType } from './enums/file-type.enum';
import { ClassFile } from './class-file.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Classes } from 'src/classes/classes.entity';

@Injectable()
export class ClassFilesService {
  constructor(
    @InjectRepository(Classes)
    private classesRepository: Repository<Classes>,

    @InjectRepository(ClassFile)
    private classFilesRepository: Repository<ClassFile>,
  ) {}

  async uploadVideoClassFile(file: Express.Multer.File, classId: number) {
    const foundClass = await this.classesRepository.findOne({
      where: { id: classId, active: true },
    });

    if (!foundClass)
      throw new UnprocessableEntityException(
        'Não foi possível armazenar videoaula',
      );

    const videoClassFile = file[0];

    const createdFile = this.classFilesRepository.create({
      fileName: videoClassFile.filename,
      fileType: FileType.VIDEOAULA,
      contentLength: videoClassFile.size,
      contentType: videoClassFile.mimetype,
      path: `${process.env.HOST_METHOD}://${process.env.HOST}:${process.env.PORT}/class-files/${videoClassFile.filename}`,
      class: foundClass,
    });

    const newClassFile = await this.classFilesRepository.save(createdFile);

    if (!newClassFile) return null;

    return newClassFile;
  }

  async uploadExtraClassFiles(files: Express.Multer.File[], classId: number) {
    const foundClass = await this.classesRepository.findOne({
      where: { id: classId, active: true },
    });

    if (!foundClass)
      throw new UnprocessableEntityException(
        'Não foi possível armazenar videoaula',
      );

    const fileInstances = files.map((file) => {
      const createdFile = this.classFilesRepository.create({
        fileName: file.filename,
        fileType: FileType.VIDEOAULA,
        contentLength: file.size,
        contentType: file.mimetype,
        path: `${process.env.HOST_METHOD}://${process.env.HOST}:${process.env.PORT}/class-files/${file.filename}`,
        class: foundClass,
      });

      return createdFile;
    });

    const newClassFiles = await this.classFilesRepository.save(fileInstances);

    if (!newClassFiles) return null;

    return newClassFiles;
  }

  findAll() {
    return `This action returns all classFiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classFile`;
  }

  update(id: number, updateClassFileDto: UpdateClassFileDto) {
    return `This action updates a #${id} classFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} classFile`;
  }
}
