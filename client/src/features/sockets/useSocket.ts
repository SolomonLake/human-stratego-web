import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SocketContext } from "./SocketContext";

export const useSocket = () => {
  const socket = useContext(SocketContext);

  const listen = useCallback(
    (ev, listener: (data: any) => void) => {
      if (socket) {
        console.log("LISTNER");
        socket.on(ev, listener);
      }
    },
    [socket]
  );

  const off = useCallback(
    (ev, listener: (data: any) => void) => {
      if (socket) {
        socket.off(ev, listener);
      }
    },
    [socket]
  );

  const emit = useCallback(
    (ev, data) => {
      if (socket) {
        socket.emit(ev, data);
      }
    },
    [socket]
  );
  return { listen, off, emit };
};
