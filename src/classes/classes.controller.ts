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

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.classesService.remove(id);
  }
}
