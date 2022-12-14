import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StudentsService {
  private students = [
    {
      id: 1,
      name: 'Ismael',
      lastname: 'Gonzalez',
    },
  ];

  getStudents() {
    return this.students;
  }

  getStudent(id: string) {
    const student = this.students.find((u) => u.id === +id);

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  createStudent(student: any) {
    this.students.push(student);
  }

  removeUser(id: string) {
    const index = this.students.findIndex((u) => u.id === +id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.students = this.students.slice(0, index);
  }

  updateStudent(id: string, properties: any) {
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
