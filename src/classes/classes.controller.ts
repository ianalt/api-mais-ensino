import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  UploadedFiles,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-classes.dto';
import { UpdateClassDto } from './dto/update-classes.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ClassesDto } from './dto/classes.dto';
import { ClassOptionsDto } from './dto/class-options.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express/multer';

import { Request } from 'express';
import classFilesUploadConfig from 'src/config/class-files-upload.config';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  //TODO finish creation, add pipes
  @Roles('professor', 'admin')
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'videoClassFile' }, { name: 'extraFiles' }],
      classFilesUploadConfig,
    ),
  )
  create(
    @Body() body: CreateClassDto,
    @UploadedFiles() classFiles: Express.Multer.File[],
    @Req() req: Request,
  ) {
    return this.classesService.create(
      body,
      classFiles['videoClassFile'],
      classFiles['extraFiles'],
      req,
    );
  }

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
