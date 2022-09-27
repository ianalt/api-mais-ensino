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
import { CreateSubjectDTO } from './dtos/create-subject.dto';
import { SubjectDTO } from './dtos/subject.dto';
import { UpdateSubjectDTO } from './dtos/update-subject.dto';
import { SubjectsService } from './subjects.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @Roles('admin')
  @Get('/:id')
  @Serialize(SubjectDTO)
  async findByID(@Param('id') id: string) {
    const subject = await this.subjectsService.findByID(parseInt(id));

    if (!subject) throw new NotFoundException('Subject not found.');

    return subject;
  }

  @Roles('admin')
  @Get()
  @Serialize(SubjectDTO)
  findAll() {
    return this.subjectsService.findAll();
  }

  @Roles('admin')
  @Post()
  @Serialize(SubjectDTO)
  async create(@Body() body: CreateSubjectDTO) {
    return await this.subjectsService.create(body);
  }

  @Roles('admin')
  @Patch('/:id')
  @Serialize(SubjectDTO)
  async update(@Param('id') id: string, @Body() body: UpdateSubjectDTO) {
    return await this.subjectsService.update(parseInt(id), body);
  }

  @Roles('admin')
  @Patch('delete/:id')
  @Serialize(SubjectDTO)
  async delete(@Param('id') id: string) {
    return await this.subjectsService.delete(parseInt(id));
  }

  @Roles('admin')
  @Delete('/:id')
  @Serialize(SubjectDTO)
  async remove(@Param('id') id: string) {
    return await this.subjectsService.remove(parseInt(id));
  }
}
