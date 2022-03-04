type PlayerMoveEvent = {
  userId: string;
  position: { x: number; y: number; z: number };
};

type PlayerDisconnectEvent = {
  userId: string;
};

interface ServerToClientEvents {
  playerMove: (ev: PlayerMoveEvent) => void;
  playerDisconnect: (ev: PlayerDisconnectEvent) => void;
}

interface ClientToServerEvents {
  playerMove: (ev: PlayerMoveEvent) => void;
}
