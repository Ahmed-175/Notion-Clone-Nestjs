import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UsersModule , PassportModule ],
  controllers: [AuthController],
  providers: [AuthService , GoogleStrategy],
})
export class AuthModule {}
