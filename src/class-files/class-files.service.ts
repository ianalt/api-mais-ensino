import { Injectable } from '@nestjs/common';
import { CreateClassFileDto } from './dto/create-class-file.dto';
import { UpdateClassFileDto } from './dto/update-class-file.dto';

@Injectable()
export class ClassFilesService {
  create(createClassFileDto: CreateClassFileDto) {
    return 'This action adds a new classFile';
  }

  findAll() {
    return `This action returns all classFiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classFile`;
  }

  update(id: number, updateClassFileDto: UpdateClassFileDto) {
    return `This action updates a #${id} classFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} classFile`;
  }
}
