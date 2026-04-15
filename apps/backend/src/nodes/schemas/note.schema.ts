

import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Note {}

export const noteSchema = SchemaFactory.createForClass(Note);