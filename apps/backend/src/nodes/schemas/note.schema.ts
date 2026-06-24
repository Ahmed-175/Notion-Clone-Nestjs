import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Node } from "./node.schema";
import { Block } from "./block.schema";

enum Fonts {
  DEFAULT = "default",
  POPPINS = "poppins",
  ALEGREYA = "alegreya",
  CAIRO = "cairo",
}

@Schema({ timestamps: true, versionKey: false })
export class Note {
  @Prop({
    default: null,
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Node.name,
  })
  nodeId: mongoose.Types.ObjectId | null;
  @Prop({ default: "" })
  banner: string;
  @Prop({ default: [] })
  tags: string[];
  resoures: [{ label: string; link: string }];
  @Prop({ enum: Fonts, default: Fonts.DEFAULT })
  font_family: string;
  @Prop({ default: true })
  public: boolean;
  @Prop({ default: 27 })
  font_size: number;
  @Prop({ default: "en" })
  lang: "en" | "ar";
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Block.name,
    default: null,
  })
  firstBlockId: mongoose.Types.ObjectId | null;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Block.name,
    default: null,
  })
  lastBlockId: mongoose.Types.ObjectId | null;

  // @Prop({ default: "" })
  // content: string;
}

export const noteSchema = SchemaFactory.createForClass(Note);
