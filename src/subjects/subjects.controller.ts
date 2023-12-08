import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateSubjectOptionsDto } from './dtos/create-subject-options.dto';
import { CreateSubjectDto } from './dtos/create-subject.dto';
import { SubjectDto } from './dtos/subject.dto';
import { UpdateSubjectOptionsDto } from './dtos/update-subject-options.dto';
import { UpdateSubjectDto } from './dtos/update-subject.dto';
import { SubjectsService } from './subjects.service';
import { FullSubjectInfoDto } from './dtos/full-subject-info.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @Roles('professor')
  @Get('/user')
  @Serialize(SubjectDto)
  async findForTeacher(@Request() req) {
    return await this.subjectsService.findForTeacher(req.user.id);
  }

  @Roles('professor', 'admin')
  @Get('/create-options')
  @Serialize(CreateSubjectOptionsDto)
  async getCreateSubjectOptions() {
    return await this.subjectsService.getCreateSubjectOptions();
  }

  @Roles('professor', 'admin')
  @Get('/update-options/:subjectId')
  @Serialize(UpdateSubjectOptionsDto)
  async getUpdateSubjectOptions(
    @Param('subjectId', ParseIntPipe) subjectId: number,
  ) {
    return await this.subjectsService.getUpdateSubjectOptions(subjectId);
  }

  @Roles('estudante', 'professor', 'admin')
  @Get('/:id')
  @Serialize(FullSubjectInfoDto)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.subjectsService.findById(id);
  }

  @Roles('estudante', 'professor', 'admin')
  @Get()
  @Serialize(SubjectDto)
  async findAll() {
    return await this.subjectsService.findAll();
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
  @Delete('/:id')
  @Serialize(SubjectDto)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.subjectsService.remove(id);
  }
}
