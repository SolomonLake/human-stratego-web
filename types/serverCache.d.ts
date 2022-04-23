type CardCounts = {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  "6": number;
  a: number;
  b: number;
  c: number;
  bomb: number;
};

type CardId = keyof CardCounts;

type Team = {
  color: "team1" | "team2";
  side: -1 | 1;
  cardCounts: CardCounts;
  id: TeamId;
  displayName: TeamDisplayName;
};

type TeamDisplayName = "Blue Team" | "Red Team";

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

type TeamMap = Record<TeamId, Team>;

type ServerCache = {
  players: PlayerMap;
  teams: TeamMap;
};
