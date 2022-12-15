import {
  Body,
  Controller,
  Get,
  Delete,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { HttpCode, Patch, Post } from '@nestjs/common/decorators';

import { StudentsService } from './students.service';
import { CreateStudentDto } from './dtos';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Get()
  getStudents() {
    return this.studentService.getStudents();
  }

  @Get(':studentId')
  getStudent(@Param('studentId') id: string) {
    return this.studentService.getStudent(id);
  }

  @Post()
  createStudent(@Body() student: CreateStudentDto) {
    return this.studentService.createStudent(student);
  }

  @Delete(':studentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUser(@Param('studentId') id: string) {
    return this.studentService.removeUser(id);
  }

  @Patch(':studentId')
  updateStudent(@Param('studentId') id: string, @Body() properties: any) {
    return this.studentService.updateStudent(id, properties);
  }
}
