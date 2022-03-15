type PlayerPosition = { x: number; y: number; z: number; yRotation: number };

type Player = {
  position: PlayerPosition;
  disconnectedAt?: number;
  teamId: string;
};

type PlayerMap = {
  [userId: string]: Player;
};

type Team = {
  hexColor: string;
};

type TeamMap = { [teamId: string]: Team };

type ServerCache = {
  players: PlayerMap;
  teams: TeamMap;
};
