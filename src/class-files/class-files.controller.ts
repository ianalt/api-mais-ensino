import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  StreamableFile,
  UnprocessableEntityException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer/interceptors/file-fields.interceptor';
import { Response } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import extraClassFilesUploadConfig from 'src/config/extra-class-files-upload.config';
import videoClassFileUploadConfig from 'src/config/video-class-file-upload.config';
import { ClassFilesService } from './class-files.service';
import { UpdateClassFileDto } from './dto/update-class-file.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ClassesDto } from 'src/classes/dto/classes.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('class-files')
export class ClassFilesController {
  constructor(private readonly classFilesService: ClassFilesService) {}

  @Get()
  findAll() {
    return this.classFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classFilesService.findOne(+id);
  }

  @Roles('professor', 'admin')
  @Post('/:classId/video-class')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'videoClassFile', maxCount: 1 }],
      videoClassFileUploadConfig,
    ),
  )
  async uploadVideoClassFile(
    @Param('classId', ParseIntPipe) classId: number,
    @UploadedFiles()
    file: Express.Multer.File,
  ) {
    const videoClass = await this.classFilesService.uploadVideoClassFile(
      file['videoClassFile'],
      classId,
    );

    if (!videoClass) {
      throw new UnprocessableEntityException(
        'Não foi possível registrar a videoaula',
      );
    }
  }

  @Roles('professor', 'admin')
  @Patch('/:classId/video-class/update')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'videoClassFile', maxCount: 1 }],
      videoClassFileUploadConfig,
    ),
  )
  @Serialize(ClassesDto)
  async updateVideoClassFile(
    @Param('classId', ParseIntPipe) classId: number,
    @UploadedFiles()
    file: Express.Multer.File,
  ) {
    const updatedClass = await this.classFilesService.updateVideoClassFile(
      file['videoClassFile'],
      classId,
    );

    if (!updatedClass) {
      throw new UnprocessableEntityException(
        'Não foi possível atualizar a videoaula',
      );
    }

    return updatedClass;
  }

  @Roles('professor', 'admin')
  @Post('/:classId/extra-files')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'extraFiles' }],
      extraClassFilesUploadConfig,
    ),
  )
  async uploadExtraClassFiles(
    @Param('classId', ParseIntPipe) classId: number,
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    const extraFiles = await this.classFilesService.uploadExtraClassFiles(
      files['extraFiles'],
      classId,
    );

    if (!extraFiles) {
      throw new UnprocessableEntityException(
        'Não foi possível registrar arquivos complementares',
      );
    }
  }

  @Get('/:classFileName/download')
  async downloadClassFile(
    @Param('classFileName') classFileName: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const fileInfo = await this.classFilesService.downloadClassFile(
      classFileName,
    );

    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': `'attachment; filename=${fileInfo.fileName}`,
    });

    return new StreamableFile(fileInfo.classFile);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClassFileDto: UpdateClassFileDto,
  ) {
    return this.classFilesService.update(+id, updateClassFileDto);
  }

  @Delete('/:fileName')
  remove(@Param('fileName') fileName: string) {
    return this.classFilesService.remove(fileName);
  }
}
