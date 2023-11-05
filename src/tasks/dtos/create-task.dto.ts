import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
export class CreateTaskDto {
  [x: string]: any;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  status: string;
}
