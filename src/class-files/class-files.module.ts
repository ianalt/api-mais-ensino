import { Module } from '@nestjs/common';
import { ClassFilesService } from './class-files.service';
import { ClassFilesController } from './class-files.controller';
import { ClassFile } from './class-file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ClassFilesController],
  providers: [ClassFilesService],
  imports: [TypeOrmModule.forFeature([ClassFile])],
  exports: [ClassFilesService],
})
export class ClassFilesModule {}
