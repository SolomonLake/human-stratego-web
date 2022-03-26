type PlayerPosition = { x: number; y: number; z: number; yRotation: number };

type Team = {
  color: "team1" | "team2";
  side: -1 | 1;
};

type TeamId = "1" | "2";

type Player = {
  position: PlayerPosition;
  disconnectedAt?: number;
  teamId: TeamId;
};

type PlayerMap = {
  [userId: string]: Player;
};

type TeamMap = { "1": Team; "2": Team };

type ServerCache = {
  players: PlayerMap;
  teams: TeamMap;
};
