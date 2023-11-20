import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateClassFileDto } from './dto/create-class-file.dto';
import { UpdateClassFileDto } from './dto/update-class-file.dto';
import { FileType } from './enums/file-type.enum';
import { ClassFile } from './class-file.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Classes } from 'src/classes/classes.entity';
import * as fs from 'fs';
import { createReadStream } from 'fs';
import { join } from 'path';

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

  //TODO UPDATE VIDEO CLASS
  async updateVideoClassFile(file: Express.Multer.File, classId: number) {
    const foundClass = await this.classesRepository.findOne({
      where: { id: classId, active: true },
    });

    if (!foundClass)
      throw new UnprocessableEntityException(
        'Não foi possível armazenar videoaula',
      );

    const videoClassFile = file[0];

    const foundVideoFiles = await this.classFilesRepository.find({
      where: {
        fileType: FileType.VIDEOAULA,
        class: {
          id: classId,
        },
      },
      relations: ['class'],
    });

    if (foundVideoFiles && foundVideoFiles.length > 0) {
      for (const file of foundVideoFiles) {
        const { fileName } = file;

        await this.classFilesRepository.remove(file);

        fs.unlink(`./uploads/video-classes/${fileName}`, (err) => {});
      }
    }

    const createdFile = this.classFilesRepository.create({
      fileName: videoClassFile.filename,
      fileType: FileType.VIDEOAULA,
      contentLength: videoClassFile.size,
      contentType: videoClassFile.mimetype,
      path: `${process.env.HOST_METHOD}://${process.env.HOST}:${process.env.PORT}/class-files/${videoClassFile.filename}`,
      class: foundClass,
    });

    const newClassFile = await this.classFilesRepository.save(createdFile);

    if (!newClassFile)
      throw new UnprocessableEntityException(
        'Não foi possível armazenar videoaula',
      );

    const classToUpdate = await this.classesRepository.findOne({
      where: {
        id: classId,
        active: true,
      },
      relations: ['classFiles', 'createdBy', 'category', 'category.subject'],
    });

    if (!classToUpdate)
      throw new UnprocessableEntityException('Erro ao armazenar videoaula');

    classToUpdate.updatedAt = new Date();

    return await this.classesRepository.save(classToUpdate);
  }
  //UPDATE VIDEO CLASS

  //TODO UPDATE EXTRA FILES
  async updateClassExtraFiles(files: Express.Multer.File[], classId: number) {
    const foundClass = await this.classesRepository.findOne({
      where: { id: classId, active: true },
    });

    if (!foundClass)
      throw new UnprocessableEntityException(
        'Não foi possível armazenar videoaula',
      );

    const foundExtraFiles = await this.classFilesRepository.find({
      where: {
        fileType: FileType.MATERIAL,
        class: {
          id: classId,
        },
      },
      relations: ['class'],
    });

    if (foundExtraFiles && foundExtraFiles.length > 0) {
      for (const file of foundExtraFiles) {
        const { fileName } = file;

        await this.classFilesRepository.remove(file);

        fs.unlink(`./uploads/extra-files/${fileName}`, (err) => {});
      }
    }

    for (const file of files) {
      const createdFile = this.classFilesRepository.create({
        fileName: file.filename,
        fileType: FileType.MATERIAL,
        contentLength: file.size,
        contentType: file.mimetype,
        path: `${process.env.HOST_METHOD}://${process.env.HOST}:${process.env.PORT}/class-files/${file.filename}`,
        class: foundClass,
      });

      const newClassFile = await this.classFilesRepository.save(createdFile);

      if (!newClassFile)
        throw new UnprocessableEntityException(
          'Não foi possível armazenar videoaula',
        );
    }

    const classToUpdate = await this.classesRepository.findOne({
      where: {
        id: classId,
        active: true,
      },
      relations: ['classFiles', 'createdBy', 'category', 'category.subject'],
    });

    if (!classToUpdate)
      throw new UnprocessableEntityException(
        'Erro ao armazenar arquivos complementares',
      );

    classToUpdate.updatedAt = new Date();

    return await this.classesRepository.save(classToUpdate);
  }

  async removeClassExtraFiles(classId: number) {
    const foundExtraFiles = await this.classFilesRepository.find({
      where: {
        fileType: FileType.MATERIAL,
        class: {
          id: classId,
        },
      },
      relations: ['class'],
    });

    if (foundExtraFiles && foundExtraFiles.length > 0) {
      for (const file of foundExtraFiles) {
        const { fileName } = file;

        await this.classFilesRepository.remove(file);

        fs.unlink(`./uploads/extra-files/${fileName}`, (err) => {});
      }
    }

    const classToUpdate = await this.classesRepository.findOne({
      where: {
        id: classId,
        active: true,
      },
      relations: ['classFiles', 'createdBy', 'category', 'category.subject'],
    });

    if (!classToUpdate)
      throw new UnprocessableEntityException(
        'Erro ao armazenar arquivos complementares',
      );

    classToUpdate.updatedAt = new Date();

    return await this.classesRepository.save(classToUpdate);
  }

  async uploadExtraClassFiles(files: Express.Multer.File[], classId: number) {
    const foundClass = await this.classesRepository.findOne({
      where: { id: classId, active: true },
    });

    if (!foundClass)
      throw new UnprocessableEntityException(
        'Não foi possível armazenar arquivos complementares',
      );

    const fileInstances = files.map((file) => {
      const createdFile = this.classFilesRepository.create({
        fileName: file.filename,
        fileType: FileType.MATERIAL,
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

  async findOne(id: number) {
    if (!id || id < 0)
      throw new BadRequestException('O ID fornecido é inválido');

    const classFile = await this.classFilesRepository.findOne({
      where: { id: id },
    });

    if (!classFile) throw new NotFoundException('Arquivo não encontrado');

    return classFile;
  }

  async downloadClassFile(fileName: string) {
    const foundFile = await this.classFilesRepository.findOne({
      where: { fileName },
    });

    if (!foundFile) throw new NotFoundException('Arquivo não encontrado');

    const { fileType } = foundFile;

    const filePath = `${process.cwd()}/uploads/${
      fileType === FileType.VIDEOAULA ? 'video-classes' : 'extra-files'
    }/`;

    const classFile = createReadStream(join(filePath, `${fileName}`));

    return {
      fileName,
      classFile,
    };
  }

  update(id: number, updateClassFileDto: UpdateClassFileDto) {
    return `This action updates a #${id} classFile`;
  }

  async remove(fileName: string) {
    const file = await this.classFilesRepository.findOne({
      where: { fileName },
    });

    if (!file) throw new NotFoundException('Arquivo não encontrado');

    fs.unlink(
      `./uploads/${
        file.fileType === FileType.VIDEOAULA ? 'video-classes' : 'extra-files'
      }/${fileName}`,
      (err) => {},
    );
  }
}
