type BaseCard = {
  displayName: string;
  displayAbbreviation: string;
};

type RankCard = BaseCard & {
  type: "rank";
  rank: number;
};

type BombCard = BaseCard & {
  type: "bomb";
};

type EliteCard = BaseCard & {
  type: "elite";
};

type Card = BombCard | RankCard | EliteCard;

export const CARDS = {
  assassin: {
    type: "elite",
    displayName: "Assassin",
    displayAbbreviation: "A",
  },
  battlemaster: {
    type: "elite",
    displayName: "Battlemaster",
    displayAbbreviation: "B",
  },
  councillor: {
    type: "elite",
    displayName: "Councillor",
    displayAbbreviation: "C",
  },

  bomb: { type: "bomb", displayName: "Bomb", displayAbbreviation: "💣" },

  scout: { type: "rank", displayName: "Scout", displayAbbreviation: "1" },
  diffuser: {
    type: "rank",
    displayName: "Diffuser",
    displayAbbreviation: "2💥",
  },
  footpad: { type: "rank", displayName: "Footpad", displayAbbreviation: "3" },
  thief: { type: "rank", displayName: "Thief", displayAbbreviation: "4" },
  agent: { type: "rank", displayName: "Agent", displayAbbreviation: "5" },
  spy: { type: "rank", displayName: "Spy", displayAbbreviation: "6" },
};
