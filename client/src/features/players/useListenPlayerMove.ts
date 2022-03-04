import { useEffect } from "react";
import { useSocket } from "../sockets/useSocket";

export const useListenPlayerMove = (listener: (data: any) => void) => {
  const { listen, off } = useSocket();

  useEffect(() => {
    listen("playerMove", listener);

    return () => {
      off("playerMove", listener);
    };
  }, []);
};
