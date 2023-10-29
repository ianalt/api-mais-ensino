import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-classes.dto';
import { UpdateClassDto } from './dto/update-classes.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ClassesDto } from './dto/classes.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  @Serialize(ClassesDto)
  findAll() {
    return this.classesService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.update(+id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classesService.remove(+id);
  }
}
