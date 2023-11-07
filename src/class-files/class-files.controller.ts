import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UnprocessableEntityException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer/interceptors/file-fields.interceptor';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import extraClassFilesUploadConfig from 'src/config/extra-class-files-upload.config';
import videoClassFileUploadConfig from 'src/config/video-class-file-upload.config';
import { ClassFilesService } from './class-files.service';
import { UpdateClassFileDto } from './dto/update-class-file.dto';

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
    console.log('files ===');
    console.log(!files ? 'HMMMMMMMMMMMMM' : 'num é');
    console.log(files.length);
    //TODO problema aqui

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
