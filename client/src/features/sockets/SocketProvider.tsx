import { ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUserId } from "../user/useUserId";
import { SocketContext } from "./SocketContext";

export const SocketProvider = (props: { children: ReactNode }) => {
  const userId = useUserId();

  const socketUrl = `ws://${window.location.host}`;
  const [socket, setSocket] = useState<
    Socket<ServerToClientEvents, ClientToServerEvents>
  >(io(socketUrl, { auth: { userId } }));

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
