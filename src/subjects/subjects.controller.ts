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
import { CreateSubjectDto } from './dtos/create-subject.dto';
import { SubjectDto } from './dtos/subject.dto';
import { UpdateSubjectDto } from './dtos/update-subject.dto';
import { SubjectsService } from './subjects.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get('/:id')
  @Serialize(SubjectDto)
  async findById(@Param('id', ParseIntPipe) id: number) {
    const subject = await this.subjectsService.findById(id);

    if (!subject) throw new NotFoundException('Subject not found.');

    return subject;
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  @Serialize(SubjectDto)
  async findAll() {
    const subjects = await this.subjectsService.findAll();

    if (!subjects)
      throw new NotFoundException('Não foi possível encontrar disciplinas');

    return subjects;
  }

  @Roles('admin')
  @Post()
  @Serialize(SubjectDto)
  async create(@Body() body: CreateSubjectDto) {
    return await this.subjectsService.create(body);
  }

  @Roles('admin')
  @Patch('/:id')
  @Serialize(SubjectDto)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateSubjectDto,
  ) {
    return await this.subjectsService.update(id, body);
  }

  @Roles('admin')
  @Delete('delete/:id')
  @Serialize(SubjectDto)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.subjectsService.delete(id);
  }

  @Roles('admin')
  @Delete('/:id')
  @Serialize(SubjectDto)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.subjectsService.remove(id);
  }
}
