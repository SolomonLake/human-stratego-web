import { useEffect } from "react";
import { useSocket } from "../sockets/useSocket";
import { PlayerMoveEvent } from "./playerTypes";

export const useListenPlayerMove = (
  listener: (data: PlayerMoveEvent) => void
) => {
  const { listen, off } = useSocket<PlayerMoveEvent>();

  useEffect(() => {
    listen("player_move", listener);

    return () => {
      off("player_move", listener);
    };
  }, []);
};
