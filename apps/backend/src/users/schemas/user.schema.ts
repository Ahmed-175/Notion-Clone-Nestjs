import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ min: 6 , select : false })
  password?: string;
  @Prop({select : false})
  google_id: string;
  @Prop({ default: '' })
  picture: string;
}

export const userSchema = SchemaFactory.createForClass(User);
