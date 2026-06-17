import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Node } from "./schemas/node.schema";
import { Model } from "mongoose";
import { CreateNodeDto } from "./dto/create-node";
import { Note } from "./schemas/note.schema";
import { BuildTree } from "src/common/utils/buildTreeFileSystem";

@Injectable()
export class NodesService {
  constructor(
    @InjectModel(Node.name) private nodeModel: Model<Node>,
    @InjectModel(Note.name) private noteModel: Model<Note>,
    private readonly buildTree: BuildTree,
  ) {}

  async create(dto: CreateNodeDto, userId: string) {
    try {
      const isTitleExist = await this.nodeModel.findOne({
        parentId: dto.parentId,
        title: dto.title,
        ownerId: userId,
      });

      if (isTitleExist) {
        throw new BadRequestException("the title is already used");
      }

      if (dto.parentId) {
        const parent = await this.nodeModel.findOne({
          type: "folder",
          _id: dto.parentId,
          ownerId: userId,
        });

        if (!parent) {
          throw new BadRequestException("this folder does not exist");
        }
      }

      const newNode = new this.nodeModel({
        type: dto.type,
        title: dto.title,
        parentId: dto.parentId,
        ownerId: userId,
      });
      await newNode.save();

      if (dto.type === "note") {
        const newNote = new this.noteModel({
          nodeId: newNode._id,
        });

        await newNote.save();
      }
      return {
        message: "item created successfully",
        node: newNode,
      };
    } catch (error) {
      return { errorMessage: error };
    }
  }

  async sortDelete(id: string, userId: string) {
    try {
      const node = await this.nodeModel.findOneAndUpdate(
        {
          _id: id,
          ownerId: userId,
          isTrash: false,
        },
        {
          isTrash: true,
        },
        {
          new: true,
        },
      );

      if (!node) {
        return { errorMessage: "Node not found or unauthorized" };
      }
      return node;
    } catch (error) {
      return { errorMessage: error };
    }
  }

  async restoreNode(id: string, userId: string) {
    try {
      const node = await this.nodeModel.findOneAndUpdate(
        {
          _id: id,
          ownerId: userId,
          isTrash: true,
        },
        {
          isTrash: false,
        },
        {
          new: true,
        },
      );

      if (!node) {
        return { errorMessage: "Node not found or unauthorized" };
      }
      return node;
    } catch (error) {
      return { errorMessage: error };
    }
  }

  async delete(id: string, userId: string) {
    try {
      const result = await this.nodeModel.deleteOne({
        _id: id,
        ownerId: userId,
      });

      if (result.deletedCount === 0) {
        throw new BadRequestException("Node not found or unauthorized");
      }
      return { message: "Node permanently deleted" };
    } catch (error) {
      return { errorMessage: error };
    }
  }

  async handlefavorite(id: string, userId: string) {
    try {
      const node = await this.nodeModel.findOne({ _id: id, ownerId: userId });

      if (!node) {
        throw new BadRequestException("Node not found or unauthorized");
      }

      node.isFavorite = !node.isFavorite;
      await node.save();

      return {
        message: node.isFavorite
          ? "Added to favorites"
          : "Removed from favorites",
        node,
      };
    } catch (error) {
      return { errorMessage: error };
    }
  }

  async updatenode(title: string, id: string, userId: string) {
    try {
      const node = await this.nodeModel.findOneAndUpdate(
        {
          _id: id,
          ownerId: userId,
        },
        { title },
        { new: true },
      );

      if (!node) {
        return { errorMessage: "Node not found or unauthorized" };
      }

      return node;
    } catch (error) {
      return { errorMessage: error };
    }
  }

  async getNoteTree(userId: string) {
    try {
      const nodes = await this.nodeModel.find({
        ownerId: userId,
        isTrash: false,
      });
      const sortedNodes = nodes.sort((a, b) => {
        if (a.type === b.type) return 0;
        if (a.type === "folder") return -1;
        return 1;
      });
      const map = this.buildTree.buildNormalized(sortedNodes);
      return {
        map,
      };
    } catch (error) {
      return { errorMessage: error };
    }
  }

  async getTrashNodes(userId: string) {
    try {
      const nodes = await this.nodeModel.find({
        ownerId: userId,
        isTrash: true,
      });
      return nodes;
    } catch (error) {
      return { errorMessage: error };
    }
  }

  async getFavoriteNodes(userId: string) {
    try {
      const nodes = await this.nodeModel.find({
        ownerId: userId,
        isFavorite: true,
        isTrash: false,
      });
      return nodes;
    } catch (error) {
      return { errorMessage: error };
    }
  }
}
