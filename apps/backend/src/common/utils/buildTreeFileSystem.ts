import { Injectable } from '@nestjs/common';
import { Node } from 'src/nodes/schemas/node.schema';

@Injectable()
export class BuildTree {
  buildNormalized(nodes: Node[]) {
    const map: Record<string, any> = {};

    nodes.forEach((node) => {
      const id = (node as any)._id.toString();
      map[id] = {
        _id: (node as any)._id,
        title: node.title,
        type: node.type,
        isFavorite: node.isFavorite,
        isTrash: node.isTrash,
        parentId: node.parentId ? node.parentId.toString() : null,
        children: [],
      };
    });

    nodes.forEach((node) => {
    const id = (node as any)._id.toString();
    const parentId = node.parentId ? node.parentId.toString() : null;

    if(parentId && map[parentId]){
      map[parentId].children.push(id);
    }
    });

    return map;
  }
}