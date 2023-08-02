import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KnowledgeArea } from 'src/knowledge-areas/knowledge-area.entity';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dtos/create-subject.dto';
import { UpdateSubjectDto } from './dtos/update-subject.dto';
import { Subject } from './subject.entity';
import { User } from 'src/users/user.entity';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,

    @InjectRepository(KnowledgeArea)
    private knowledgeAreasRepository: Repository<KnowledgeArea>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private allRelations = ['users', 'knowledgeArea', 'categories'];

  findById(id: number) {
    if (!id) return null;

    return this.subjectsRepository.findOne({
      where: { id, active: true },
      relations: this.allRelations,
    });
  }

  async findAll() {
    const subjects = await this.subjectsRepository.find({
      relations: this.allRelations,
    });

    if (!subjects) return null;

    return subjects;
  }

  async getCreateSubjectOptions() {
    const options = await Promise.all([
      this.knowledgeAreasRepository.find({ where: { active: true } }),
      this.usersRepository.find({ where: { active: true } }),
    ]);

    const knowledgeAreaOptions = options[0];

    const teacherOptions = options[1].filter(
      (user) => user.role === Role.PROFESSOR,
    );

    const monitorsOptions = options[1].filter(
      (user) => user.role === Role.MONITOR,
    );

    return {
      knowledgeAreaOptions,
      teacherOptions,
      monitorsOptions,
    };
  }

  async create(body: CreateSubjectDto) {
    const { knowledgeAreaId, ...attrs } = body;

    const knowledgeArea = await this.knowledgeAreasRepository.findOne({
      where: {
        active: true,
        id: knowledgeAreaId,
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

  async update(id: number, body: UpdateSubjectDto) {
    const subject = await this.findById(id);

    if (!subject) throw new NotFoundException('Subject not found.');

    const { knowledgeAreaId, ...values } = body;

    const knowledgeArea = await this.knowledgeAreasRepository.findOne({
      where: {
        active: true,
        id: knowledgeAreaId,
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
    const subject = await this.findById(id);

    if (!subject) throw new NotFoundException('Subject not found.');

    subject.updatedAt = new Date();
    subject.active = false;

    return this.subjectsRepository.save(subject);
  }

  async remove(id: number) {
    const subject = await this.findById(id);

    if (!subject) throw new NotFoundException('Subject not found.');

    return this.subjectsRepository.remove(subject);
  }
}
