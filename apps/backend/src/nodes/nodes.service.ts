import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Node } from './schemas/node.schema';
import { Model } from 'mongoose';
import { CreateNodeDto } from './dto/create-node';
import { Block } from './schemas/block.schema';
import { Note } from './schemas/note.schema';
import { BuildTree } from 'src/common/utils/buildTreeFileSystem';

@Injectable()
export class NodesService {
  constructor(
    @InjectModel(Node.name) private nodeModel: Model<Node>,
    @InjectModel(Note.name) private noteModel: Model<Note>,
    @InjectModel(Block.name) private blockModel: Model<Block>,
    private readonly buildTree: BuildTree,
  ) {}

  async create(dto: CreateNodeDto, userId: string) {
    const isTitleExist = await this.nodeModel.findOne({
      parentId: dto.parentId,
      title: dto.title,
      ownerId: userId,
    });

    if (isTitleExist) {
      throw new BadRequestException('the title is already used');
    }

    if (dto.parentId) {
      const parent = await this.nodeModel.findOne({
        type: 'folder',
        _id: dto.parentId,
        ownerId: userId,
      });

      if (!parent) {
        throw new BadRequestException('this folder does not exist');
      }
    }

    const newNode = new this.nodeModel({
      type: dto.type,
      title: dto.title,
      parentId: dto.parentId,
      ownerId: userId,
    });
    await newNode.save();

    if (dto.type === 'note') {
      const newNote = new this.noteModel({
        nodeId: newNode._id,
      });

      await newNote.save();
    }
    return {
      message: 'item created successfully',
      node: newNode,
    };
  }
  async sortDelete(id: string, userId: string) {}
  async delete(id: string, userId: string) {}
  async handlefavorite(id: string, userId: string) {}
  async updatenode(dto: CreateNodeDto, userId: string) {}
  async getNoteTree(userId: string) {
    console.log(userId);
    const nodes = await this.nodeModel.find({ ownerId: userId });
    const tree = this.buildTree.buildTreeFileSystem(nodes);
    console.log(tree);
    return {
      tree
    };
  }
}
