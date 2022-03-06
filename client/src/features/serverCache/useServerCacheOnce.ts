import { useEffect } from "react";
import { useSocket } from "../sockets/useSocket";

export const useServerCacheOnce = (
  onServerCache: (cache: ServerCache) => void
) => {
  const socket = useSocket();

  useEffect(() => {
    socket.once("serverCache", (cache) => {
      console.log("cache", cache);
      onServerCache(cache);
    });
  }, []);
};
