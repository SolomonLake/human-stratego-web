import { useEffect } from "react";
import { useCacheStore } from "../cache/useCache";
import { useSocket } from "../sockets/useSocket";

export const usePlayerJoinedListener = () => {
  const socket = useSocket();
  const { cache, dispatch } = useCacheStore();

  const onPlayerJoined = (ev: PlayerJoinedEvent) => {
    dispatch({ type: "playerJoined", event: ev });
  };

  useEffect(() => {
    socket.on("playerJoined", onPlayerJoined);

    return () => {
      socket.off("playerJoined", onPlayerJoined);
    };
  }, [socket]);
};
