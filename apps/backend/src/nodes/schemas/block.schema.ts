import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Note } from './note.schema';

export enum BlockType {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  P = 'p',
  LINE = 'line',
  LINK = 'link',
  IMAGE = 'image',
  VIDEO = 'video',
  QUOTE = 'quote',
  TODO = 'todo',
  LIST = 'list',
  MSQ = 'msq',
}

@Schema({ timestamps: true, versionKey: false })
export class Block {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Note.name,
  })
  noteId: mongoose.Types.ObjectId;
  @Prop({ required: true })
  order: number;

  @Prop({
    required: true,
    enum: BlockType,
    default: BlockType.P,
  })
  type: BlockType;

  @Prop()
  content?: string;

  @Prop()
  url?: string;

  @Prop()
  href?: string;

  @Prop({
    type: {
      date: { type: Date },
      status: { type: Boolean, default: false },
    },
    default: null,
  })
  checked?: {
    date: Date;
    status: boolean;
  };

  @Prop()
  question?: string;

  @Prop({ type: [String] })
  choices?: string[];

  @Prop()
  correctIndex?: number;
}

export const BlockSchema = SchemaFactory.createForClass(Block);

BlockSchema.index({ noteId: 1 });
BlockSchema.index({ noteId: 1, order: 1 });
BlockSchema.index({
  content: 'text',
  question: 'text',
});
