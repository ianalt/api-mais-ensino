import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KnowledgeArea } from 'src/knowledge-areas/knowledge-area.entity';
import { Repository } from 'typeorm';
import { CreateSubjectDTO } from './dtos/create-subject.dto';
import { UpdateSubjectDTO } from './dtos/update-subject.dto';
import { Subject } from './subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,

    @InjectRepository(KnowledgeArea)
    private knowledgeAreasRepository: Repository<KnowledgeArea>,
  ) {}

  private allRelations = ['users', 'knowledgeArea', 'categories'];

  findByID(id: number) {
    if (!id) return null;

    return this.subjectsRepository.findOne({
      where: { id, active: true },
      relations: this.allRelations,
    });
  }

  findAll() {
    return this.subjectsRepository.find({
      where: { active: true },
      relations: this.allRelations,
    });
  }

  async create(body: CreateSubjectDTO) {
    const { knowledgeAreaID, ...attrs } = body;

    const knowledgeArea = await this.knowledgeAreasRepository.findOne({
      where: {
        active: true,
        id: knowledgeAreaID,
      },
    });

    if (!knowledgeArea)
      throw new NotFoundException('Knowledge area not found.');

    const newSubject = this.subjectsRepository.create({
      ...attrs,
    });

    newSubject.knowledgeArea = knowledgeArea;

    return this.subjectsRepository.save(newSubject);
  }

  async update(id: number, body: UpdateSubjectDTO) {
    const subject = await this.findByID(id);

    if (!subject) throw new NotFoundException('Subject not found.');

    const { knowledgeAreaID, ...values } = body;

    const knowledgeArea = await this.knowledgeAreasRepository.findOne({
      where: {
        active: true,
        id: knowledgeAreaID,
      },
    });

    if (!knowledgeArea)
      throw new NotFoundException('Knowledge area not found.');

    const attrs: Partial<Subject> = values;

    subject.updatedAt = new Date();
    subject.knowledgeArea = knowledgeArea;

    Object.assign(subject, attrs);

    return this.subjectsRepository.save(subject);
  }

  async delete(id: number) {
    const subject = await this.findByID(id);

    if (!subject) throw new NotFoundException('Subject not found.');

    subject.updatedAt = new Date();
    subject.active = false;

    return this.subjectsRepository.save(subject);
  }

  async remove(id: number) {
    const subject = await this.findByID(id);

    if (!subject) throw new NotFoundException('Subject not found.');

    return this.subjectsRepository.remove(subject);
  }
}
