import { useEffect } from "react";
import { useSocket } from "../sockets/useSocket";

export const usePlayerMoveListener = (
  onPlayerMove: (ev: PlayerMoveEvent) => void
) => {
  const socket = useSocket();

  useEffect(() => {
    socket.on("playerMove", onPlayerMove);

    return () => {
      socket.off("playerMove", onPlayerMove);
    };
  }, [socket]);
};
