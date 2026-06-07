import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { NoteType } from "./create-node";
import { Optional } from "@nestjs/common";

export class UpdateNodeDto {

  @IsString()
  @Optional()
  @ApiProperty()
  title: string;

  @Optional()
  @IsString()
  @ApiProperty()
  type: NoteType;

  @Optional()
  @IsString()
  @ApiProperty()
  parentId: string | null;
}
