type PlayerJoinEvent = { userId: string; position: PlayerPosition };

type PlayerMoveEvent = {
  userId: string;
  position: PlayerPosition;
};

type PlayerDisconnectEvent = {
  userId: string;
  disconnectedAt: number;
};

interface ServerToClientEvents {
  playerJoin: (ev: PlayerJoinEvent) => void;
  playerMove: (ev: PlayerMoveEvent) => void;
  playerDisconnect: (ev: PlayerDisconnectEvent) => void;
  serverCache: (ev: ServerCache) => void;
}

interface ClientToServerEvents {
  playerMove: (ev: PlayerMoveEvent) => void;
}
