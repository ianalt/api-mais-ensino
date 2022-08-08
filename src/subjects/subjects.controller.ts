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
import { CreateSubjectDTO } from './dtos/create-subject.dto';
import { UpdateSubjectDTO } from './dtos/update-subject.dto';
import { SubjectsService } from './subjects.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @Roles('admin')
  @Get('/history/:id')
  async findById(@Param('id') id: string) {
    const subject = await this.subjectsService.findById(parseInt(id));

    if (!subject) throw new NotFoundException('Subject not found.');

    return subject;
  }

  @Roles('admin')
  @Get('/:id')
  async findActiveById(@Param('id') id: string) {
    const subject = await this.subjectsService.findActiveById(parseInt(id));

    if (!subject) throw new NotFoundException('Subject not found.');

    return subject;
  }

  @Roles('admin')
  @Get('/history')
  findAll() {
    return this.subjectsService.findAll();
  }

  @Roles('admin')
  @Get()
  findAllActive() {
    return this.subjectsService.findAllActive();
  }

  @Roles('admin')
  @Post()
  create(@Body() body: CreateSubjectDTO) {
    return this.subjectsService.create(body);
  }

  @Roles('admin')
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateSubjectDTO) {
    return await this.subjectsService.update(parseInt(id), body);
  }

  @Roles('admin')
  @Patch('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.subjectsService.setActive(parseInt(id), false);
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.subjectsService.remove(parseInt(id));
  }
}
