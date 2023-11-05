import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpUserDto } from './dtos/sign-up.user.dto';
import { SignInUserDto } from './dtos/sign-in.user.dto';
import { User } from './user.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(user: SignUpUserDto): Promise<User> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }
  async login(user: SignInUserDto): Promise<any> {
    const userFound = await this.userModel.findOne({ email: user.email });

    if (!userFound) {
      return { message: 'User not found' };
    }

    // Now we use the comparePassword method from your User schema.
    const isMatch = await userFound.comparePassword(user.password);

    if (!isMatch) {
      return { message: 'Wrong password' };
    }

    // After a successful match, proceed to sign the JWT.
    // Assuming you have injected JwtService and it is available as this.jwtService

    const payload = { email: userFound.email, userId: userFound._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
