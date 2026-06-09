import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateNodeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;
}
