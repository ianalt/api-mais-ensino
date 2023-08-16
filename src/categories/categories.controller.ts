import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dtos/category.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get('/:id')
  @Serialize(CategoryDto)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.findById(id);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  @Serialize(CategoryDto)
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Roles('professor', 'admin')
  @Post()
  @Serialize(CategoryDto)
  async create(@Body() body: CreateCategoryDto) {
    return await this.categoriesService.create(body);
  }

  @Roles('professor', 'admin')
  @Patch('/:id')
  @Serialize(CategoryDto)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCategoryDto,
  ) {
    return await this.categoriesService.update(id, body);
  }

  @Roles('professor', 'admin')
  @Delete('delete/:id')
  @Serialize(CategoryDto)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.delete(id);
  }

  @Roles('admin')
  @Delete('/:id')
  @Serialize(CategoryDto)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.remove(id);
  }
}
