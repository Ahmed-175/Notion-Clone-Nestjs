import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Node } from "src/nodes/schemas/node.schema";
import { Note } from "src/nodes/schemas/note.schema";

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private readonly noteModel: Model<Note>,

    @InjectModel(Node.name)
    private readonly nodeModel: Model<Node>,
  ) {}

  async findByNodeId(nodeId: string) {
    const node = await this.nodeModel
      .findOne({
        _id: nodeId,
        isTrash: false,
      })
      .lean();

    if (!node) {
      throw new BadRequestException("This node does not exist");
    }

    const note = await this.noteModel
      .findOne({
        nodeId,
      })
      .lean();

    if (!note) {
      throw new BadRequestException("This note does not exist");
    }

    return {
      ...node,
      ...note,
    };
  }

  async handleContentChanges(userId: string, content: string, nodeId: string) {
    const node = await this.nodeModel.findById(nodeId);
    const note = await this.noteModel.findOne({ nodeId });

    if (!node || !note) {
      throw new NotFoundException("this note does not exist");
    }

    const isOwner = node.ownerId.toString() === userId;

    const isContributor = node.contributors.some(
      (id: any) => id.toString() === userId,
    );

    if (!isOwner && !isContributor) {
      throw new UnauthorizedException(
        "You do not have permission to update the content",
      );
    }

    note.content = content;
    await note.save();

    return note.content;
  }
}
