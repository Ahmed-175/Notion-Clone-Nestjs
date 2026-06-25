import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Node } from "src/nodes/schemas/node.schema";

@Injectable()
export class NodeAccessService {
  constructor(
    @InjectModel(Node.name) private readonly nodeModel: Model<Node>,
  ) {}

  async canEdit(nodeId: string, userId: string) {
    const node = await this.nodeModel.findById(nodeId);

    if (!node) {
      throw new NotFoundException("Node not found");
    }
    const isOwner = node.ownerId.toString() === userId;
    const isContributor = node.contributors.some(
      (c) => c.toString() === userId,
    );

    if (!isOwner && !isContributor) {
      throw new UnauthorizedException("Access denied");
    }

    return true;
  }
}
