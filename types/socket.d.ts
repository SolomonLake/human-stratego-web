type PlayerJoinedEvent = { userId: string; position: PlayerPosition };

type PlayerMovedEvent = {
  userId: string;
  position: PlayerPosition;
};

type PlayerCardChangedEvent = {
  userId: string;
  cardId: CardId;
};

type PlayerDisconnectedEvent = {
  userId: string;
  disconnectedAt: number;
};

interface ServerToClientEvents {
  playerJoined: (ev: PlayerJoinedEvent) => void;
  playerMoved: (ev: PlayerMovedEvent) => void;
  playerCardChanged: (ev: PlayerCardChangedEvent) => void;
  playerDisconnected: (ev: PlayerDisconnectedEvent) => void;
  serverCache: (ev: ServerCache) => void;
}

interface ClientToServerEvents {
  playerMoved: (ev: PlayerMovedEvent) => void;
  playerCardChanged: (ev: PlayerCardChangedEvent) => void;
}
