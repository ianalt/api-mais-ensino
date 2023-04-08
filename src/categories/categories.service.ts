import { Injectable, NotFoundException } from '@nestjs/common';
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

  private allRelations = ['topics', 'subject'];

  findById(id: number) {
    if (!id) return null;

    return this.categoriesRepository.findOne({
      where: { id, active: true },
      relations: this.allRelations,
    });
  }

  async findAll() {
    const categories = await this.categoriesRepository.find({
      relations: this.allRelations,
    });

    if (!categories) return null;

    return categories;
  }

  async create(body: CreateCategoryDto) {
    const { subjectId, ...attrs } = body;

    const subject = await this.subjectsRepository.findOne({
      where: {
        active: true,
        id: subjectId,
      },
    });

    if (!subject) throw new NotFoundException('Subject not found.');

    const newCategory = this.categoriesRepository.create({
      ...attrs,
    });

    newCategory.subject = subject;

    return this.categoriesRepository.save(newCategory);
  }

  async update(id: number, body: UpdateCategoryDto) {
    const category = await this.findById(id);

    if (!category) throw new NotFoundException('Category not found.');

    const { subjectId, ...values } = body;

    const subject = await this.subjectsRepository.findOne({
      where: {
        active: true,
        id: subjectId,
      },
    });

    if (!subject) throw new NotFoundException('Subject not found.');

    const attrs: Partial<Category> = values;

    category.updatedAt = new Date();
    category.subject = subject;

    Object.assign(category, attrs);

    return this.categoriesRepository.save(category);
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

    if (!category) throw new NotFoundException('Category not found.');

    return this.categoriesRepository.remove(category);
  }
}
