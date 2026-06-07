import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { NodesService } from "./nodes.service";
import { JwtGuard } from "src/common/guards/jwt.guard";
import { CreateNodeDto } from "./dto/create-node";
import { UpdateNodeDto } from "./dto/update-node";

@UseGuards(JwtGuard)
@Controller("nodes")
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Post("create")
  async createNode(@Body() dto: CreateNodeDto, @Request() req) {
    return await this.nodesService.create(dto, req.user._id);
  }

  @Put(":id")
  async updateNode(
    @Body() dto: UpdateNodeDto,
    @Param("id") id: string,
    @Request() req,
  ) {
    return await this.nodesService.updatenode(dto.title, id, req.user._id);
  }

  @Delete(":id")
  async softDeleteNode(@Param("id") id: string, @Request() req) {
    return await this.nodesService.sortDelete(id, req.user._id);
  }

  @Get("")
  async getNodes(@Request() req) {
    return await this.nodesService.getNoteTree(req.user._id);
  }

  @Patch(":id/favorite")
  async toggleFavorite(@Param("id") id: string, @Request() req) {
    return await this.nodesService.handlefavorite(id, req.user._id);
  }
}
