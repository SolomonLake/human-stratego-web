type PlayerJoinEvent = { userId: string; position: PlayerPosition };

type PlayerMoveEvent = {
  userId: string;
  position: PlayerPosition;
};

type PlayerCardChangeEvent = {
  userId: string;
  cardId: CardId;
};

type PlayerDisconnectEvent = {
  userId: string;
  disconnectedAt: number;
};

interface ServerToClientEvents {
  playerJoin: (ev: PlayerJoinEvent) => void;
  playerMove: (ev: PlayerMoveEvent) => void;
  playerCardChange: (ev: PlayerCardChangeEvent) => void;
  playerDisconnect: (ev: PlayerDisconnectEvent) => void;
  serverCache: (ev: ServerCache) => void;
}

interface ClientToServerEvents {
  playerMove: (ev: PlayerMoveEvent) => void;
  playerCardChange: (ev: PlayerCardChangeEvent) => void;
}
