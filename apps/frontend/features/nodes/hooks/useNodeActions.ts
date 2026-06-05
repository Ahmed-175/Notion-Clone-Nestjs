// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { nodeService } from "../services/node.service";

// export const useNodeActions = () => {
//   const queryClient = useQueryClient();

//   const createNode = useMutation({
//     mutationFn: (data: {
//       title: string;
//       type: "folder" | "note";
//       parentId: string | null;
//     }) => nodeService.create(data),
//     onSuccess: (newNode) => {
//       queryClient.setQueryData(["nodes"], (old: any = []) => {
//         return [newNode, ...old];
//       });
//     },
//   });

//   const updatedNode = useMutation({
//     mutationFn: ({ id, data }: any) => nodeService.update(id, data),
//     onSuccess: (updatedNode) => {
//       queryClient.setQueryData(["nodes"], (old: any = []) => {
//         return old.map((note: any) =>
//           note.id === (updatedNode as any).id ? updatedNode : note,
//         );
//       });
//     },
//   });
//   return {
//     createNode,
//     updatedNode,
//   };
// };
