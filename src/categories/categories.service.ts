import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/subjects/subject.entity';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,

    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
  ) {}

  private allRelations = ['topics', 'subject'];

  findByID(id: number) {
    if (!id) return null;

    return this.categoriesRepository.findOne({
      where: { id, active: true },
      relations: this.allRelations,
    });
  }

  findAll() {
    return this.categoriesRepository.find({
      where: { active: true },
      relations: this.allRelations,
    });
  }

  async create(body: CreateCategoryDTO) {
    const { subjectID, ...attrs } = body;

    const subject = await this.subjectsRepository.findOne({
      where: {
        active: true,
        id: subjectID,
      },
    });

    if (!subject) throw new NotFoundException('Subject not found.');

    const newCategory = this.categoriesRepository.create({
      ...attrs,
    });

    newCategory.subject = subject;

    return this.categoriesRepository.save(newCategory);
  }

  async update(id: number, body: UpdateCategoryDTO) {
    const category = await this.findByID(id);

    if (!category) throw new NotFoundException('Category not found.');

    const { subjectID, ...values } = body;

    const subject = await this.subjectsRepository.findOne({
      where: {
        active: true,
        id: subjectID,
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
    const category = await this.findByID(id);

    if (!category) throw new NotFoundException('Category not found.');

    category.updatedAt = new Date();
    category.active = false;

    return this.categoriesRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.findByID(id);

    if (!category) throw new NotFoundException('Category not found.');

    return this.categoriesRepository.remove(category);
  }
}
