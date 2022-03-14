type PlayerPosition = { x: number; y: number; z: number; yRotation: number };

type Player = { position: PlayerPosition; disconnectedAt?: number };

type PlayerMap = {
  [userId: string]: Player;
};

type ServerCache = {
  players: PlayerMap;
};
