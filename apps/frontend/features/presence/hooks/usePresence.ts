import { useContext } from "react";
import { PresenceContext } from "../context/presence.context";

const usePresence = () => {
  const context = useContext(PresenceContext);

  if (!context) {
    throw new Error("presence context not provide");
  }

  return context;
};

export default usePresence;
