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
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ClassesService } from './classes.service';
import { ClassOptionsDto } from './dto/class-options.dto';
import { ClassesDto } from './dto/classes.dto';
import { CreateClassDto } from './dto/create-classes.dto';
import { UpdateClassDto } from './dto/update-classes.dto';
import { UpdateClassTitleDto } from './dto/update-class-title.dto';
import { UpdateClassCategoryDto } from './dto/update-class-category.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  @Serialize(ClassesDto)
  findAll() {
    return this.classesService.findAll();
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  @Serialize(ClassesDto)
  findAllFromSubject(@Query('subjectId', ParseIntPipe) subjectId: number) {
    return this.classesService.findAllFromSubject(subjectId);
  }

  @Roles('professor', 'admin')
  @Get('/options')
  @Serialize(ClassOptionsDto)
  async getClassOptions() {
    return await this.classesService.getClassOptions();
  }

  @Get('/:id')
  @Serialize(ClassesDto)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const foundClass = await this.classesService.findOne(id);

    if (!foundClass) throw new NotFoundException('Aula não encontrada');

    return foundClass;
  }

  @Roles('professor', 'admin')
  @Post()
  async create(@Body() body: CreateClassDto, @Request() req: any) {
    return await this.classesService.create(body, req.user.id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.update(+id, updateClassDto);
  }

  @Roles('professor', 'admin')
  @Patch('/:id/class-title')
  @Serialize(ClassesDto)
  async updateClassTitle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateClassTitleDto,
  ) {
    return await this.classesService.updateClassTitle(id, body);
  }

  @Roles('professor', 'admin')
  @Patch('/:id/class-category')
  @Serialize(ClassesDto)
  async updateClassCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateClassCategoryDto,
  ) {
    return await this.classesService.updateClassCategory(id, body);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.classesService.remove(id);
  }
}
