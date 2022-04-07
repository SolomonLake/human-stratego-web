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

export const CARDS: { [key in CardId]: Card } = {
  a: {
    type: "elite",
    displayName: "Assassin",
    displayAbbreviation: "A",
  },
  b: {
    type: "elite",
    displayName: "Bureaucrat",
    displayAbbreviation: "B",
  },
  c: {
    type: "elite",
    displayName: "Champion",
    displayAbbreviation: "C",
  },

  bomb: { type: "bomb", displayName: "Bomb", displayAbbreviation: "💣" },

  "1": {
    type: "rank",
    rank: 1,
    displayName: "Scout",
    displayAbbreviation: "1",
  },
  "2": {
    type: "rank",
    rank: 2,
    displayName: "Diffuser",
    displayAbbreviation: "2💥",
  },
  "3": {
    type: "rank",
    rank: 3,
    displayName: "Footpad",
    displayAbbreviation: "3",
  },
  "4": {
    type: "rank",
    rank: 4,
    displayName: "Thief",
    displayAbbreviation: "4",
  },
  "5": {
    type: "rank",
    rank: 5,
    displayName: "Agent",
    displayAbbreviation: "5",
  },
  "6": { type: "rank", rank: 6, displayName: "Spy", displayAbbreviation: "6" },
};
