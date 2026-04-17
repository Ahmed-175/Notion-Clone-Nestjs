import { Injectable } from '@nestjs/common';
import { Node } from 'src/nodes/schemas/node.schema';

@Injectable()
export class BuildTree {
  buildTreeFileSystem(nodes: Node[], parentId: any = null) {
    const tree = nodes
      .filter((node) => {
        if (parentId === null) {
          return node.parentId === null;
        }
        return node.parentId?.toString() === parentId?.toString();
      })
      .map((node) => ({
        _id: (node as any)._id,
        title: node.title,
        type: node.type,
        isFavorite: node.isFavorite,
        isTrash: node.isTrash,

        children: this.buildTreeFileSystem(nodes, (node as any)._id),
      }));

    return tree;
  }
}
