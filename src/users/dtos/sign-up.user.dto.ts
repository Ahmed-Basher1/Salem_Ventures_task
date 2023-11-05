import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class SignUpUserDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  name: string;
}
