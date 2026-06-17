import { INode } from "@/types/node.type";
import {
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Menu from "../components/Menu";
import { IMenuContext } from "../types/menu.type";
import useNodeActions from "@/hooks/useNodeActions";


export const menuContext = createContext<IMenuContext | null>(null);

const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { toggleFavoriteNode, deleteNode } = useNodeActions();
  const home: any = {
    title: "main folder",
    _id: null,
    type: "folder",
    isFavorite: false,
    isTrash: false,
    children: [],
  };
  const [node, setNode] = useState<INode>(home);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const menuRef = useRef<HTMLDivElement | null>(null);

  const showMenu = (node: INode, x: number, y: number) => {
    setNode(node);
    setPosition({ x, y });
    setOpenMenu(true);
  };

  useEffect(() => {
    const handleClickOut = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    };

    window.addEventListener("mousedown", handleClickOut);

    return () => {
      window.removeEventListener("mousedown", handleClickOut);
    };
  }, []);

  const toggleFavorite = async (nodeId: string) => {
    await toggleFavoriteNode(nodeId);
    setOpenMenu(false);
  }

  const softDelete = async () => {
    if (node._id) {
      await deleteNode(node._id);
      setOpenMenu(false);
    }
  }

  return (
    <menuContext.Provider
      value={{
        showMenu,
        openMenu,
        setNode,
        node,
        position,
        toggleFavorite,
        softDelete,
      }}
    >
      {children}
      {openMenu && (
        <div ref={menuRef}>
          <Menu node={node} y={position.y} x={position.x} />
        </div>
      )}
    </menuContext.Provider>
  );
};

export default MenuProvider;
