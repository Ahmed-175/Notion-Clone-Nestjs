import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Node } from "src/nodes/schemas/node.schema";
import { Note } from "../schema/note.schema";
import { CommitType, ICommitLineDto } from "../types/commit.type";

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
  async handleCommitLines(
    commits: ICommitLineDto[],
    nodeId: string,
    userId: string,
  ) {
    const node = await this.nodeModel.findById(nodeId);
    if (!node) {
      throw new NotFoundException("Node not found");
    }
    const isOwner = node?.ownerId.toString() === userId;

    const isContributor = node?.contributors.some(
      (c) => c.toString() === userId,
    );

    if (!isOwner && !isContributor) {
      throw new UnauthorizedException(
        "You do not have access to update this node",
      );
    }
    const note = await this.noteModel.findOne({ nodeId });
    for (const commit of commits) {
      switch (commit.type) {
        case CommitType.NEW:
          // commit.data => INewLineData

          break;

        case CommitType.DELETE:
          // commit.data => IDeleteLineData

          break;

        case CommitType.UPDATE:
          // commit.data => IUpdateLineData

          break;
      }
    }
  }
}
