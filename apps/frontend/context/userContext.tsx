"use client";
import useToast from "@/hooks/useToast";
import { me } from "@/services/auth.service";
import { IUser } from "@/types/user.type";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface IUserContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const userContext = createContext<IUserContext | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const { showMgs } = useToast();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fatchData = async () => {
      try {
        const data: any = await me();

        setUser(data);
      } catch (error: any) {
        console.error(error);
        showMgs({ type: "error", message: error.response.data.message });
      } finally {
        setLoading(false);
      }
    };

    fatchData();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </userContext.Provider>
  );
};
