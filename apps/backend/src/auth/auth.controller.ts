import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto } from './dto/login-user.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.userService.googleAuth(req.user);
    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.redirect('http://localhost:3000/home');
    return;
  }

  @Post('register')
  async register(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.userService.create(dto);

    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    return {
      message: 'Register Successful',
    };
  }

  @Post('login')
  async login(
    @Body() dto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.userService.checkUser(dto);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    });
    return {
      message: 'Login successful',
    };
  }

  @Get('me')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async me(@Request() req) {
    return await this.userService.me(req.user._id);
  }
}
