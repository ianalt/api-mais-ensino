import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/subjects/subject.entity';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,

    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
  ) {}

  private allRelations = ['subject', 'classes'];

  async findById(id: number) {
    if (!id || id < 0) throw new NotFoundException('Categoria não encontrada');

    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: this.allRelations,
    });

    if (!category) throw new NotFoundException('Categoria não encontrada');

    return category;
  }

  async findAll() {
    const categories = await this.categoriesRepository.find({
      relations: this.allRelations,
    });

    if (!categories || categories.length <= 0) return [];

    return categories;
  }

  async getCategoryOptions() {
    const options = await Promise.all([
      this.subjectsRepository.find({ where: { active: true } }),
    ]);

    const subjectOptions = options[0];

    return {
      subjectOptions,
    };
  }

  async create(body: CreateCategoryDto) {
    const { subjectId, ...attrs } = body;

    const categoryWithName = await this.categoriesRepository.findOne({
      where: { name: attrs.name, subject: { id: subjectId } },
    });

    if (categoryWithName)
      throw new UnprocessableEntityException(
        'Uma categoria com este nome já existe na disciplina selecionada',
      );

    const subject = await this.subjectsRepository.findOne({
      where: { id: subjectId, active: true },
    });

    if (!subject) throw new NotFoundException('Disciplina não encontrada');

    const newCategory = this.categoriesRepository.create({
      ...attrs,
    });

    newCategory.subject = subject;

    return await this.categoriesRepository.save(newCategory);
  }

  async update(id: number, body: UpdateCategoryDto) {
    const category = await this.findById(id);

    if (!category) throw new NotFoundException('Categoria não encontrada');

    const { subjectId, ...values } = body;

    const categoryWithName = await this.categoriesRepository.findOne({
      where: { name: values.name },
    });

    if (categoryWithName && categoryWithName.id !== id)
      throw new UnprocessableEntityException(
        'Uma disciplina com este nome já existe',
      );

    const subject = await this.subjectsRepository.findOne({
      where: { id: subjectId, active: true },
    });

    if (!subject) throw new NotFoundException('Disciplina não encontrada');

    const attrs: Partial<Category> = values;

    category.updatedAt = new Date();
    category.subject = subject;

    Object.assign(category, attrs);

    return await this.categoriesRepository.save(category);
  }

  async delete(id: number) {
    const category = await this.findById(id);

    if (!category) throw new NotFoundException('Category not found.');

    category.updatedAt = new Date();
    category.active = false;

    return this.categoriesRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.findById(id);

    if (!category) throw new NotFoundException('Categoria não encontrada');

    return this.categoriesRepository.remove(category);
  }
}
