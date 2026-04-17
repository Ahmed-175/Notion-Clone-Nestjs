import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

enum NoteType {
  FOLDER = 'folder',
  NOTE = 'note',
}

export class CreateNodeDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  type: NoteType;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  parentId: string | null;
}
