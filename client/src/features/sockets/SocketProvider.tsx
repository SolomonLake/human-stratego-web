import { ReactNode, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUserId } from "../user/useUserId";
import { SocketContext } from "./SocketContext";

type HSSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export const SocketProvider = (props: { children: ReactNode }) => {
  const userId = useUserId();

  const socketUrl = `ws://${window.location.host}`;
  const socket = useRef<HSSocket>(io(socketUrl, { auth: { userId } }));

  return (
    <SocketContext.Provider value={socket.current}>
      {props.children}
    </SocketContext.Provider>
  );
};
