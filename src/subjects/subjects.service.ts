import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateSubjectDTO } from './dtos/create-subject.dto';
import { UpdateSubjectDTO } from './dtos/update-subject.dto';
import { Subject } from './subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
  ) {}

  private allRelations = ['users', 'knowledgeArea', 'categories'];

  findById(id: number) {
    if (!id) return null;

    return this.subjectsRepository.findOne({
      where: { id },
      relations: this.allRelations,
    });
  }

  findActiveById(id: number) {
    if (!id) return null;

    return this.subjectsRepository.findOne({
      where: { id, active: true },
      relations: this.allRelations,
    });
  }

  findAll() {
    return this.subjectsRepository.find({
      relations: this.allRelations,
    });
  }

  findAllActive() {
    return this.subjectsRepository.find({
      where: { active: true },
      relations: this.allRelations,
    });
  }

  create(body: CreateSubjectDTO) {
    const newSubject = this.subjectsRepository.create({
      createdAt: new Date(),
      ...body,
    });

    return this.subjectsRepository.save(newSubject);
  }

  async update(id: number, body: UpdateSubjectDTO) {
    const subject = await this.findActiveById(id);

    if (!subject) throw new NotFoundException('Subject not found.');

    const attrs: Partial<Subject> = body;

    subject.updatedAt = new Date();

    Object.assign(subject, attrs);

    return this.subjectsRepository.save(subject);
  }

  async setActive(id: number, active: boolean) {
    const subject = await this.findById(id);

    if (!subject) throw new NotFoundException('Subject not found.');

    subject.updatedAt = new Date();
    subject.active = active;

    return this.subjectsRepository.save(subject);
  }

  async remove(id: number) {
    const subject = await this.findActiveById(id);

    if (!subject) throw new NotFoundException('Subject not found.');

    return this.subjectsRepository.remove(subject);
  }
}
