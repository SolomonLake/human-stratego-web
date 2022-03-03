import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SocketContext } from "./SocketContext";

export const useSocket = <T>() => {
  const socket = useContext(SocketContext);

  const listen = useCallback(
    (ev: string, listener: (data: T) => void) => {
      if (socket) {
        console.log("LISTNER");
        socket.on(ev, listener);
      }
    },
    [socket]
  );

  const off = useCallback(
    (ev: string, listener: (data: T) => void) => {
      if (socket) {
        socket.off(ev, listener);
      }
    },
    [socket]
  );

  const emit = useCallback(
    (ev: string, data: T) => {
      if (socket) {
        socket.emit(ev, data);
      }
    },
    [socket]
  );
  return { listen, off, emit };
};
