import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dtos';
import { Student } from './entities';

@Injectable()
export class StudentsService {
  // private students = [
  //   {
  //     id: 1,
  //     name: 'Ismael',
  //     lastname: 'Gonzalez',
  //   },
  // ];

  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}

  getStudents() {
    return this.studentsRepository.find();
  }

  async getStudent(id: string) {
    const student = await this.studentsRepository.findOneBy({ id: +id });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  async createStudent(student: CreateStudentDto) {
    const studentToCreate = this.studentsRepository.create(student);

    await this.studentsRepository.save(studentToCreate);
  }

  async removeUser(id: string) {
    const student = await this.studentsRepository.findOneBy({ id: +id });

    if (!student) {
      throw new NotFoundException('User not found');
    }

    this.studentsRepository.delete({ id: +id });
  }

  async updateStudent(id: string, properties: any) {
    const student = await this.studentsRepository.preload({
      id: +id,
      ...properties,
    });

    if (!student) {
      throw new NotFoundException('User not found');
    }

    await this.studentsRepository.save(student);

    return true;
  }
}
