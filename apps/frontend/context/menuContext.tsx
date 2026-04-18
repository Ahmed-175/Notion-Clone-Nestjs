import Menu from "@/components/sidebar_components/Menu";
import { INode } from "@/types/node.type";
import {
  createContext,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface IMenuContext {
  showMenu: (node: INode, x: number, y: number) => void;
  openMenu: boolean;
  setNode: React.Dispatch<SetStateAction<INode>>;
  node: INode;
  position: { x: number; y: number };
}

export const menuContext = createContext<IMenuContext | null>(null);

const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const home: INode = {
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

  return (
    <menuContext.Provider
      value={{
        showMenu,
        openMenu,
        setNode,
        node,
        position,
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
