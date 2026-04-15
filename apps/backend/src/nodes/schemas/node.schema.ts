import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Node {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  type: 'folder' | 'note';
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  parentId: mongoose.Types.ObjectId;
}

export const nodeSchema = SchemaFactory.createForClass(Node);
