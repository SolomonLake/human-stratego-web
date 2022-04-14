import { useEffect } from "react";
import { useSocket } from "../../sockets/useSocket";
import { useCacheStore } from "../useCacheStore";

export const usePlayerConfrontationResolvedListener = (
  onResolved: (ev: PlayerConfrontationResolvedEvent) => void
) => {
  const socket = useSocket();
  const { cache, dispatch } = useCacheStore();

  const onPlayerConfrontationResolved = (
    ev: PlayerConfrontationResolvedEvent
  ) => {
    dispatch({ type: "playerConfrontationResolved", event: ev });
    onResolved(ev);
  };

  useEffect(() => {
    socket.on("playerConfrontationResolved", onPlayerConfrontationResolved);

    return () => {
      socket.off("playerConfrontationResolved", onPlayerConfrontationResolved);
    };
  }, [socket]);
};
