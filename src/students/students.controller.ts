import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Delete,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { HttpCode, Patch, Post } from '@nestjs/common/decorators';

@Controller('students')
export class StudentsController {
  private students = [
    {
      id: 1,
      name: 'Ismael',
      lastname: 'Gonzalez',
    },
  ];

  @Get()
  getStudents() {
    return this.students;
  }

  @Get(':studentId')
  getStudent(@Param('studentId') id: string) {
    const student = this.students.find((u) => u.id === +id);

    if (!student) {
      throw new NotFoundException('User not found');
    }

    return student;
  }

  @Post()
  createStudent(@Body() student: any) {
    this.students.push(student);
  }

  @Delete(':studentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUser(@Param('studentId') id: string) {
    const index = this.students.findIndex((u) => u.id === +id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.students = this.students.slice(0, index);
  }

  @Patch(':studentId')
  updateStudent(@Param('studentId') id: string, @Body() properties: any) {
    const index = this.students.findIndex((u) => u.id === +id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.students[index] = {
      ...this.students[index],
      ...properties,
    };

    return { success: true };
  }
}
