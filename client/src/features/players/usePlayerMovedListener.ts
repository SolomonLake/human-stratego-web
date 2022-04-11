import { useEffect } from "react";
import { useSocket } from "../sockets/useSocket";

export const usePlayerMovedListener = (
  onPlayerMoved: (ev: PlayerMovedEvent) => void
) => {
  const socket = useSocket();

  useEffect(() => {
    socket.on("playerMoved", onPlayerMoved);

    return () => {
      socket.off("playerMoved", onPlayerMoved);
    };
  }, [socket]);
};
