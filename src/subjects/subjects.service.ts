import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KnowledgeArea } from 'src/knowledge-areas/knowledge-area.entity';
import { In, Repository } from 'typeorm';
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
      this.usersRepository.find({ where: { active: true, subject: null } }),
    ]);

    const knowledgeAreaOptions = options[0];

    const teacherOptions = options[1].filter(
      (user) => user.role === Role.PROFESSOR && !user.subject,
    );

    const monitorsOptions = options[1].filter(
      (user) => user.role === Role.MONITOR && !user.subject,
    );

    return {
      knowledgeAreaOptions,
      teacherOptions,
      monitorsOptions,
    };
  }

  async create(body: CreateSubjectDto) {
    const { knowledgeAreaId, teacherId, monitorsIds, ...attrs } = body;

    const subjectWithName = await this.subjectsRepository.findOne({
      where: { name: attrs.name },
    });

    if (subjectWithName)
      throw new UnprocessableEntityException(
        'Uma disciplina com este nome já existe',
      );

    const knowledgeArea = await this.knowledgeAreasRepository.findOne({
      where: {
        active: true,
        id: knowledgeAreaId,
      },
    });

    const teacher = await this.usersRepository.findOne({
      where: {
        active: true,
        id: teacherId,
        role: Role.PROFESSOR,
        subject: null,
      },
    });

    const monitors =
      monitorsIds.length === 0
        ? []
        : await this.usersRepository.find({
            where: {
              active: true,
              id: In(monitorsIds),
              role: Role.MONITOR,
              subject: null,
            },
          });

    if (!knowledgeArea)
      throw new NotFoundException('Área de conhecimento não encontrada');

    if (!teacher) throw new NotFoundException('Professor(a) não encontrado(a)');

    if (!monitors)
      throw new NotFoundException(
        'Um(a) ou mais monitores(as) não encontrados(as)',
      );

    const users = monitors.length > 0 ? [teacher, ...monitors] : [teacher];

    const newSubject = this.subjectsRepository.create({
      ...attrs,
    });

    newSubject.knowledgeArea = knowledgeArea;

    const createdSubject = await this.subjectsRepository.save(newSubject);

    for (const user of users) {
      user.subject = createdSubject;

      await this.usersRepository.save(user);
    }

    return createdSubject;
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
