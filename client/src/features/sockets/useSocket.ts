import { useContext } from "react";
import { SocketContext } from "./SocketContext";

export const useSocket = () => {
  const socket = useContext(SocketContext);

  if (!socket) {
    throw new Error("No socket found! Check the SocketProvider.");
  }

  return socket;
};
