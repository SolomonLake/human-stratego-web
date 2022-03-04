import { useSocket } from "../sockets/useSocket";
import { PlayerMoveEvent } from "./playerTypes";

export const useEmitPlayerMove = () => {
  const { emit } = useSocket();

  return (data: PlayerMoveEvent) => emit("playerMove", data);
};
