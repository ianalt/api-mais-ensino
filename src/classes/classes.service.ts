import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-classes.dto';
import { UpdateClassDto } from './dto/update-classes.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Classes } from './classes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Classes)
    private classesRepository: Repository<Classes>,
  ) {}

  private allRelations = ['questions', 'classFiles', 'createdBy', 'category'];

  create(createClassDto: CreateClassDto) {
    return 'This action adds a new class';
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
