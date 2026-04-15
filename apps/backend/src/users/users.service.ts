import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordHasher } from 'src/common/utils/password.util';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from 'src/auth/dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly hasher: PasswordHasher,
    private readonly jwtServise: JwtService,
  ) {}

  async googleAuth(userData: {
    username: string;
    google_id: string;
    email: string;
  }) {
    const user = await this.userModel.findOne({ email: userData.email });

    if (user) {
      const token = this.jwtServise.sign(
        { _id: user._id },
        { secret: process.env.JWT_SECRET },
      );

      return token;
    }

    const newUser = new this.userModel({
      username: userData.username,
      email: userData.email,
      google_id: userData.google_id,
    });

    await newUser.save();

    const token = this.jwtServise.sign(
      { _id: newUser._id },
      { secret: process.env.JWT_SECRET },
    );

    return token;
  }
  async create(dto: CreateUserDto) {
    const users = await this.findByName(dto.username);

    if (users.length) {
      throw new BadRequestException('username is already used');
    }
    const isExistEmail = await this.userModel.findOne({ email: dto.email });
    if (isExistEmail) {
      throw new BadRequestException('email is already used');
    }
    const passwordHashed = await this.hasher.hash(dto.password);

    const newUser = new this.userModel({
      ...dto,
      password: passwordHashed,
    });

    await newUser.save();
    const token = this.jwtServise.sign(
      { _id: newUser._id },
      {
        secret: process.env.JWT_SECRET,
      },
    );

    return token;
  }
  async findByName(username: string) {
    const users = await this.userModel.find({ username });
    return users;
  }

  async checkUser(dto: LoginAuthDto) {
    const user = await this.userModel
      .findOne({ email: dto.email })
      .select('+password');

    if (!user) {
      throw new BadRequestException('user is not exist');
    }
    if (!user.password) {
      throw new BadRequestException('login in with your google account');
    }
    const isCorrect = await this.hasher.comparePasswords(
      dto.password,
      user.password,
    );
    if (isCorrect) {
      const token = this.jwtServise.sign(
        { _id: user._id },
        {
          secret: process.env.JWT_SECRET,
        },
      );
      return token;
    }

    throw new UnauthorizedException('password is wrong');
  }

  async me(_id: string) {
    return await this.userModel.findById(_id);
  }
}
