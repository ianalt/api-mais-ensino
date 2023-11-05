import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-classes.dto';
import { UpdateClassDto } from './dto/update-classes.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Classes } from './classes.entity';
import { Repository } from 'typeorm';
import { Subject } from 'src/subjects/subject.entity';
import { Category } from 'src/categories/category.entity';
import { Request } from 'express';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Classes)
    private classesRepository: Repository<Classes>,

    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,

    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  private allRelations = ['questions', 'classFiles', 'createdBy', 'category'];

  async getClassOptions() {
    const subjects = await this.subjectsRepository.find({
      where: { active: true },
      relations: ['categories'],
    });

    if (!subjects || subjects.length <= 0) return { subjects: [] };

    return {
      subjects,
    };
  }

  create(
    body: CreateClassDto,
    videoClassFile: Express.Multer.File[],
    extraFiles: Express.Multer.File[],
    req: Request,
  ) {
    return {
      body,
      videoClassFile,
      extraFiles,
    };
  }

  async findAll() {
    const classes = await this.classesRepository.find({
      relations: this.allRelations,
    });

    if (!classes || classes.length <= 0) return [];

    return classes;
  }

  findOne(id: number) {
    return `This action returns a #${id} class`;
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
