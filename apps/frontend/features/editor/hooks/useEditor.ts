import { useContext } from "react";
import { EditorContext } from "../context/Editor.context";

const useEditor = () => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("the editor context is not provide");
  }

  return context;
};

export default useEditor;
