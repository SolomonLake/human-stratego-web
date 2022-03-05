type PlayerPosition = { x: number; y: number; z: number };

type PlayerMoveEvent = {
  userId: string;
  position: PlayerPosition;
};

type PlayerDisconnectEvent = {
  userId: string;
};

type PlayerMap = { [userId: string]: { position: PlayerPosition } };

type ServerCache = {
  players: PlayerMap;
};

interface ServerToClientEvents {
  playerMove: (ev: PlayerMoveEvent) => void;
  playerDisconnect: (ev: PlayerDisconnectEvent) => void;
  serverCache: (ev: ServerCache) => void;
}

interface ClientToServerEvents {
  playerMove: (ev: PlayerMoveEvent) => void;
}
