import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  private allRelations = ['topic', 'subject'];

  findById(id: number) {
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

  create(body: CreateCategoryDTO) {
    const newCategory = this.categoriesRepository.create({
      createdAt: new Date(),
      ...body,
    });

    return this.categoriesRepository.save(newCategory);
  }

  async update(id: number, body: UpdateCategoryDTO) {
    const category = await this.findById(id);

    if (!category) throw new NotFoundException('Category not found.');

    const attrs: Partial<Category> = body;

    category.updatedAt = new Date();

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
