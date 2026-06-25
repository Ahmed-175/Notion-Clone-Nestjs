import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CommitLineDto } from "./commit-line.dto";

export class CommitBatchDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommitLineDto)
  commits: CommitLineDto[];
}
