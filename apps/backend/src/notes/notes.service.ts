import { BadRequestException, Injectable } from "@nestjs/common";
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
}
