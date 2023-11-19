import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateClassDto } from './dto/create-classes.dto';
import { UpdateClassDto } from './dto/update-classes.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Classes } from './classes.entity';
import { Repository } from 'typeorm';
import { Subject } from 'src/subjects/subject.entity';
import { Category } from 'src/categories/category.entity';
import { Request } from 'express';
import { User } from 'src/users/user.entity';
import { FileType } from 'src/class-files/enums/file-type.enum';
import { ClassFilesService } from 'src/class-files/class-files.service';
import { UpdateClassTitleDto } from './dto/update-class-title.dto';
import { UpdateClassCategoryDto } from './dto/update-class-category.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Classes)
    private classesRepository: Repository<Classes>,

    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,

    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private classFilesService: ClassFilesService,
  ) {}

  private allRelations = [
    'questions',
    'classFiles',
    'createdBy',
    'category',
    'category.subject',
  ];

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

  async create(body: CreateClassDto, creatorId: number) {
    const { categoryId, ...data } = body;

    const [category, user] = await Promise.allSettled([
      this.categoriesRepository.findOne({
        where: { id: categoryId, active: true },
      }),

      this.usersRepository.findOne({
        where: { id: creatorId, active: true },
      }),
    ]);

    if (!category || category.status === 'rejected')
      throw new UnprocessableEntityException(`Categoria não encontrada`);

    if (!user || user.status === 'rejected')
      throw new UnprocessableEntityException(`Usuário não encontrado`);

    const createdClass = this.classesRepository.create({
      ...data,
      category: category.value,
      createdBy: user.value,
    });

    const newClass = await this.classesRepository.save(createdClass);

    if (!newClass)
      throw new UnprocessableEntityException(
        'Não foi possível criar nova aula',
      );

    return await this.findOne(newClass.id);
  }

  async findAllFromSubject(subjectId: number) {
    const classes = await this.classesRepository.find({
      relations: this.allRelations,
      where: {
        category: {
          subject: {
            id: subjectId,
          },
        },
      },
    });

    if (!classes || classes.length <= 0) return [];

    return classes;
  }

  async findAll() {
    const classes = await this.classesRepository.find({
      relations: this.allRelations,
    });

    if (!classes || classes.length <= 0) return [];

    return classes;
  }

  async findOne(id: number) {
    if (!id || id < 0) return null;

    const oneClass = await this.classesRepository.findOne({
      where: { id },
      relations: this.allRelations,
    });

    if (!oneClass) return null;

    return oneClass;
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  async updateClassTitle(id: number, body: UpdateClassTitleDto) {
    if (!id || id < 0) throw new BadRequestException('ID de aula inválido');

    const foundClass = await this.findOne(id);

    if (!foundClass) throw new NotFoundException('Aula não encontrada');

    const attrs: Partial<Classes> = body;

    foundClass.updatedAt = new Date();

    Object.assign(foundClass, attrs);

    return await this.classesRepository.save(foundClass);
  }

  async updateClassCategory(id: number, body: UpdateClassCategoryDto) {
    if (!id || id < 0) throw new BadRequestException('ID de aula inválido');

    const foundClass = await this.findOne(id);

    if (!foundClass) throw new NotFoundException('Aula não encontrada');

    const category = await this.categoriesRepository.findOne({
      where: {
        id: body.categoryId,
      },
    });

    if (!category) throw new NotFoundException('Categoria não encontrada');

    foundClass.updatedAt = new Date();
    foundClass.category = category;

    return await this.classesRepository.save(foundClass);
  }

  async remove(id: number) {
    const foundClass = await this.findOne(id);

    if (!foundClass) throw new NotFoundException('Aula não encontrada');

    if (foundClass && foundClass.classFiles.length > 0) {
      const { classFiles } = foundClass;

      const removedFiles = await Promise.all(
        classFiles.map((classFile) => {
          return this.classFilesService.remove(classFile.fileName);
        }),
      );

      if (!removedFiles || removedFiles.length < 0)
        throw new BadRequestException(
          'Não foi possível remover arquivos da aula',
        );
    }

    await this.classesRepository.remove(foundClass);
  }
}
