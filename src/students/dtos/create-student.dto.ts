import { IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsString()
  lastname: string;
}
