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
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Roles('professor', 'admin')
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const category = await this.categoriesService.findById(parseInt(id));

    if (!category) throw new NotFoundException('Category not found.');

    return category;
  }

  @Roles('professor', 'admin')
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Roles('professor', 'admin')
  @Post()
  create(@Body() body: CreateCategoryDTO) {
    return this.categoriesService.create(body);
  }

  @Roles('professor', 'admin')
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateCategoryDTO) {
    return await this.categoriesService.update(parseInt(id), body);
  }

  @Roles('professor', 'admin')
  @Patch('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.categoriesService.delete(parseInt(id));
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.categoriesService.remove(parseInt(id));
  }
}
