import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NodesService } from './nodes.service';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { CreateNodeDto } from './dto/create-node';

@UseGuards(JwtGuard)
@Controller('nodes')
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Post('create')
  async createNode(@Body() dto: CreateNodeDto, @Request() req) {
    return await this.nodesService.create(dto, req.user._id);
  }
  @Put(':id')
  async updateNode(
    @Body() dto: CreateNodeDto,
    @Param('id') id: string,
    @Request() req,
  ) {}
  @Delete(':id')
  async deleteNode(@Param('id') id: string, @Request() req) {}

  @Get('')
  async getNodes(@Request() req) {
    return  await this.nodesService.getNoteTree(req.user._id);
  }

  @Get(':id')
  async isFavorite(@Request() req, @Param('id') id: string) {}
}
