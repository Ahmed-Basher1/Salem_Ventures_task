import { Body, Controller, Post, Get } from '@nestjs/common';
import { SignUpUserDto } from './dtos/sign-up.user.dto';
import { UsersService } from './users.service';
import { SignInUserDto } from './dtos/sign-in.user.dto';
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('/users')
  @Post('/signup')
  async signUp(@Body() SignUpUserDto: SignUpUserDto): Promise<void> {
    await this.usersService.createUser(SignUpUserDto);
  }
  @Post('/signin')
  async signIn(@Body() SignInUserDto: SignInUserDto): Promise<any> {
    return await this.usersService.login(SignInUserDto);
  }
}
