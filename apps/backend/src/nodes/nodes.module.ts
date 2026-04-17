import { Module } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { NodesController } from './nodes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Node, nodeSchema } from './schemas/node.schema';
import { Note, noteSchema } from './schemas/note.schema';
import { Block, BlockSchema } from './schemas/block.schema';
import { BuildTree } from 'src/common/utils/buildTreeFileSystem';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Node.name, schema: nodeSchema },
      { name: Note.name, schema: noteSchema },
      { name: Block.name, schema: BlockSchema },
    ]),
  ],
  controllers: [NodesController],
  providers: [NodesService, BuildTree],
})
export class NodesModule {}
