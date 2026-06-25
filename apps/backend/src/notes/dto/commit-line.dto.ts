import { IsEnum, IsObject } from "class-validator";
import { CommitType } from "../types/commit.type";

export class CommitLineDto {
  @IsEnum(CommitType)
  type: CommitType;

  @IsObject()
  data: Record<string, any>;
}
