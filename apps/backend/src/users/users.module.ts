import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/user.schema';
import { PasswordHasher } from 'src/common/utils/password.util';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    JwtModule
  ],
  controllers: [UsersController],
  providers: [UsersService, PasswordHasher],
  exports: [UsersService],
})
export class UsersModule {}
