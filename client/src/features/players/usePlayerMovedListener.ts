import { useEffect } from "react";
import { useCacheStore } from "../cache/useCacheStore";
import { useSocket } from "../sockets/useSocket";

export const usePlayerMovedListener = () => {
  const socket = useSocket();
  const { cache, dispatch } = useCacheStore();

  const onPlayerMoved = (ev: PlayerMovedEvent) => {
    dispatch({ type: "playerMoved", payload: ev });
  };

  useEffect(() => {
    socket.on("playerMoved", onPlayerMoved);

    return () => {
      socket.off("playerMoved", onPlayerMoved);
    };
  }, [socket]);
};
