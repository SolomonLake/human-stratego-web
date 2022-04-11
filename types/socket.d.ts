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

type PlayerConfrontedEvent = {
  userId: string;
  confrontedUserId: string;
};

type PlayerConfrontationResolvedEvent = {
  userId: string;
  userCard: CardId;
  confrontedUserId: string;
  confrontedUserCard: CardId;
};

interface ServerToClientEvents {
  playerJoined: (ev: PlayerJoinedEvent) => void;
  playerMoved: (ev: PlayerMovedEvent) => void;
  playerCardChanged: (ev: PlayerCardChangedEvent) => void;
  playerDisconnected: (ev: PlayerDisconnectedEvent) => void;
  playerConfrontationResolved: (ev: PlayerConfrontationResolvedEvent) => void;
  serverCache: (ev: ServerCache) => void;
}

interface ClientToServerEvents {
  playerMoved: (ev: PlayerMovedEvent) => void;
  playerCardChanged: (ev: PlayerCardChangedEvent) => void;
  playerConfronted: (ev: PlayerConfrontedEvent) => void;
}
