import { ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "./SocketContext";

export const SocketProvider = (props: { children: ReactNode }) => {
  // const socketUrl = `ws://${window.location.host}`;
  // Don't need a socket url if the server is the same domain as the host
  // https://socket.io/docs/v4/client-initialization/
  const [socket, setSocket] = useState<Socket>(io());

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
