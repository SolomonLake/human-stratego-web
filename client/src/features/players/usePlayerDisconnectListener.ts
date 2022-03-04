import { useEffect } from "react";
import { useSocket } from "../sockets/useSocket";

export const usePlayerDisconnectListener = (
  onPlayerDisconnect: (ev: PlayerDisconnectEvent) => void
) => {
  const socket = useSocket();

  useEffect(() => {
    socket.on("playerDisconnect", onPlayerDisconnect);

    return () => {
      socket.off("playerDisconnect", onPlayerDisconnect);
    };
  }, [socket]);
};
