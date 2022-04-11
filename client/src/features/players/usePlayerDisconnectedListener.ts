import { useEffect } from "react";
import { useSocket } from "../sockets/useSocket";

export const usePlayerDisconnectedListener = (
  onPlayerDisconnected: (ev: PlayerDisconnectedEvent) => void
) => {
  const socket = useSocket();

  useEffect(() => {
    socket.on("playerDisconnected", onPlayerDisconnected);

    return () => {
      socket.off("playerDisconnected", onPlayerDisconnected);
    };
  }, [socket]);
};
