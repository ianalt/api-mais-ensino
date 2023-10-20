import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassFilesService } from './class-files.service';
import { CreateClassFileDto } from './dto/create-class-file.dto';
import { UpdateClassFileDto } from './dto/update-class-file.dto';

@Controller('class-files')
export class ClassFilesController {
  constructor(private readonly classFilesService: ClassFilesService) {}

  @Post()
  create(@Body() createClassFileDto: CreateClassFileDto) {
    return this.classFilesService.create(createClassFileDto);
  }

  @Get()
  findAll() {
    return this.classFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classFilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassFileDto: UpdateClassFileDto) {
    return this.classFilesService.update(+id, updateClassFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classFilesService.remove(+id);
  }
}
