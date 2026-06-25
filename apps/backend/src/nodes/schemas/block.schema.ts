import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { BlockType } from "../types/blockData.type";

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Block {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Note",
    index: true,
  })
  noteId: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(BlockType),
  })
  type: BlockType;

  @Prop({
    type: mongoose.Schema.Types.Mixed,
    default: {},
    required: true,
  })
  data: Record<string, any>;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Block",
    default: null,
  })
  prev: mongoose.Types.ObjectId | null;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Block",
    default: null,
  })
  next: mongoose.Types.ObjectId | null;
}

export const BlockSchema = SchemaFactory.createForClass(Block);

BlockSchema.index({ noteId: 1 });

BlockSchema.index({
  "data.content": "text",
  "data.question": "text",
});
