import { useEffect } from "react";
import { useCacheStore } from "../cache/useCacheStore";
import { useSocket } from "../sockets/useSocket";

export const usePlayerDisconnectedListener = (
  onPlayerDisconnected: (ev: PlayerDisconnectedEvent) => void
) => {
  const socket = useSocket();
  const { cache, dispatch } = useCacheStore();

  useEffect(() => {
    socket.on("playerDisconnected", onPlayerDisconnected);

    return () => {
      socket.off("playerDisconnected", onPlayerDisconnected);
    };
  }, [socket]);
};
