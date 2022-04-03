type CardCounts = {
  scout: number;
  diffuser: number;
  footpad: number;
  thief: number;
  agent: number;
  spy: number;
  assassin: number;
  battlemaster: number;
  councillor: number;
  bomb: number;
};

type CardId = keyof CardCounts;

type Team = {
  color: "team1" | "team2";
  side: -1 | 1;
  cardCounts: CardCounts;
};

type TeamId = "1" | "2";

type PlayerPosition = { x: number; y: number; z: number; yRotation: number };

type Player = {
  position: PlayerPosition;
  disconnectedAt?: number;
  teamId: TeamId;
  cardId: CardId;
};

type PlayerMap = {
  [userId: string]: Player;
};

type TeamMap = { "1": Team; "2": Team };

type ServerCache = {
  players: PlayerMap;
  teams: TeamMap;
};
