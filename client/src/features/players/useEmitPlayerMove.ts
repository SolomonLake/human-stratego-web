import { useSocket } from "../sockets/useSocket";
import { PlayerMoveEvent } from "./playerTypes";

export const useEmitPlayerMove = () => {
  const { emit } = useSocket<PlayerMoveEvent>();

  return (data: PlayerMoveEvent) => emit("player_move", data);
};
