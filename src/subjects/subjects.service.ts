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

  //TODO no errors please
  private allRelations = [
    'users',
    'knowledgeArea',
    'categories',
    'categories.classes',
  ];

  async findById(id: number) {
    if (!id || id < 0) throw new NotFoundException('Disciplina não encontrada');

    const subject = await this.subjectsRepository.findOne({
      where: { id },
      relations: this.allRelations,
    });

    if (!subject) throw new NotFoundException('Disciplina não encontrada');

    return subject;
  }

  async findAll() {
    const subjects = await this.subjectsRepository.find({
      relations: this.allRelations,
    });

    if (!subjects || subjects.length <= 0) return [];

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

    const [knowledgeArea, teacher, monitors] = await Promise.allSettled([
      this.knowledgeAreasRepository.findOne({
        where: {
          active: true,
          id: knowledgeAreaId,
        },
      }),

      this.usersRepository.findOne({
        where: {
          active: true,
          id: teacherId,
          role: Role.PROFESSOR,
          subject: null,
        },
      }),

      monitorsIds.length === 0
        ? []
        : this.usersRepository.find({
            where: {
              active: true,
              id: In(monitorsIds),
              role: Role.MONITOR,
              subject: null,
            },
          }),
    ]);

    if (knowledgeArea.status === 'rejected')
      throw new NotFoundException('Área de conhecimento não encontrada');

    if (teacher.status === 'rejected')
      throw new NotFoundException('Professor(a) não encontrado(a)');

    if (monitors.status === 'rejected')
      throw new NotFoundException(
        'Um(a) ou mais monitores(as) não encontrados(as)',
      );

    const users = [teacher.value, ...monitors.value];

    const newSubject = this.subjectsRepository.create({
      ...attrs,
    });

    newSubject.knowledgeArea = knowledgeArea.value;
    newSubject.users = users;

    return await this.subjectsRepository.save(newSubject);
  }

  async getUpdateSubjectOptions(subjectId: number) {
    await this.findById(subjectId);

    const options = await Promise.all([
      this.knowledgeAreasRepository.find({ where: { active: true } }),
      this.usersRepository.find({ where: { active: true } }),
    ]);

    const knowledgeAreaOptions = options[0];

    const teacherOptions = options[1].filter(
      (user) =>
        user.role === Role.PROFESSOR &&
        (!user.subject || user.subject.id === subjectId),
    );

    const monitorsOptions = options[1].filter(
      (user) =>
        user.role === Role.MONITOR &&
        (!user.subject || user.subject.id === subjectId),
    );

    return {
      knowledgeAreaOptions,
      teacherOptions,
      monitorsOptions,
    };
  }

  async update(id: number, body: UpdateSubjectDto) {
    const subject = await this.findById(id);

    if (!subject) throw new NotFoundException('Disciplina não encontrada');

    const { knowledgeAreaId, teacherId, monitorsIds, ...values } = body;

    const subjectWithName = await this.subjectsRepository.findOne({
      where: { name: values.name },
    });

    if (subjectWithName && subjectWithName.id !== id)
      throw new UnprocessableEntityException(
        'Uma disciplina com este nome já existe',
      );

    const [knowledgeArea, teacher, monitors] = await Promise.allSettled([
      this.knowledgeAreasRepository.findOne({
        where: {
          active: true,
          id: knowledgeAreaId,
        },
      }),

      this.usersRepository.findOne({
        where: {
          active: true,
          id: teacherId,
          role: Role.PROFESSOR,
        },
      }),

      monitorsIds.length === 0
        ? []
        : this.usersRepository.find({
            where: {
              active: true,
              id: In(monitorsIds),
              role: Role.MONITOR,
            },
          }),
    ]);

    if (knowledgeArea.status === 'rejected')
      throw new NotFoundException('Área de conhecimento não encontrada');

    if (teacher.status === 'rejected')
      throw new NotFoundException('Professor(a) não encontrado(a)');

    if (monitors.status === 'rejected')
      throw new NotFoundException(
        'Um(a) ou mais monitores(as) não encontrados(as)',
      );

    const attrs: Partial<Subject> = values;

    subject.updatedAt = new Date();
    subject.knowledgeArea = knowledgeArea.value;
    subject.users = [teacher.value, ...monitors.value];

    Object.assign(subject, attrs);

    return await this.subjectsRepository.save(subject);
  }

  async delete(id: number) {
    const subject = await this.findById(id);

    if (!subject) throw new NotFoundException('Disciplina não encontrada');

    subject.updatedAt = new Date();
    subject.active = false;

    return this.subjectsRepository.save(subject);
  }

  async remove(id: number) {
    const subject = await this.findById(id);

    if (!subject) throw new NotFoundException('Disciplina não encontrada');

    return this.subjectsRepository.remove(subject);
  }

  async findForTeacherOrMonitor(userId: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['subject'],
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    if (user.subject === null) return null;

    const subjectId = user.subject.id;

    const subject = await this.subjectsRepository.findOne({
      where: {
        id: subjectId,
      },
      relations: [
        'knowledgeArea',
        'categories',
        'users',
        //TODO include classes
      ],
    });

    if (!subject) return null;

    return subject;
  }
}
