import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema({ timestamps: true, versionKey: false })
export class Node {
  @Prop({ required: true, default: 'Untitle' })
  title: string;
  @Prop({ required: true, default: 'note' })
  type: 'folder' | 'note';
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Node.name,
  })
  parentId: mongoose.Types.ObjectId | null;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  ownerId: mongoose.Types.ObjectId;
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: User.name,
  })
  contributors: mongoose.Types.ObjectId[];
  @Prop({ default: false })
  isFavorite: boolean;
  @Prop({ default: false })
  isTrash: boolean;
}

export const nodeSchema = SchemaFactory.createForClass(Node);
