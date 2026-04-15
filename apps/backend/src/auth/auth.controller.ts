import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto } from './dto/login-user.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginAuthDto) {
    return await this.userService.checkUser(dto);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async me(@Request() req) {
    return await this.userService.me(req.user._id);
  }
}
