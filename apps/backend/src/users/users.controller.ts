import {
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { storgeUserPicture } from 'src/common/config/multer.config';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: storgeUserPicture,
    }),
  )
  async upload(@UploadedFile() picture, @Request() req) {
    await this.userModel.findByIdAndUpdate(req.user._id, {
      picture: picture.filename,
    });

    return {
      url : picture.filename
    }
  }
}
