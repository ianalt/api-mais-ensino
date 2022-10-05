import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CategoriesService } from './categories.service';
import { CategoryDTO } from './dtos/category.dto';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get('/:id')
  @Serialize(CategoryDTO)
  async findByID(@Param('id') id: string) {
    const category = await this.categoriesService.findByID(parseInt(id));

    if (!category) throw new NotFoundException('Category not found.');

    return category;
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  @Serialize(CategoryDTO)
  async findAll() {
    const categories = await this.categoriesService.findAll();

    if (!categories) throw new NotFoundException('Could not find categories.');

    return categories;
  }

  @Roles('professor', 'admin')
  @Post()
  @Serialize(CategoryDTO)
  async create(@Body() body: CreateCategoryDTO) {
    return await this.categoriesService.create(body);
  }

  @Roles('professor', 'admin')
  @Patch('/:id')
  @Serialize(CategoryDTO)
  async update(@Param('id') id: string, @Body() body: UpdateCategoryDTO) {
    return await this.categoriesService.update(parseInt(id), body);
  }

  @Roles('professor', 'admin')
  @Delete('delete/:id')
  @Serialize(CategoryDTO)
  async delete(@Param('id') id: string) {
    return await this.categoriesService.delete(parseInt(id));
  }

  @Roles('admin')
  @Delete('/:id')
  @Serialize(CategoryDTO)
  async remove(@Param('id') id: string) {
    return await this.categoriesService.remove(parseInt(id));
  }
}
