type BaseCard = {
  displayName: string;
  displayCharacter: string;
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
  bomb: { type: "bomb", displayName: "Bomb", displayCharacter: "B" },

  scout: { type: "rank", displayName: "Scout", displayCharacter: "1" },
  diffuser: { type: "rank", displayName: "Diffuser", displayCharacter: "2" },
  footpad: { type: "rank", displayName: "Footpad", displayCharacter: "3" },
  thief: { type: "rank", displayName: "Thief", displayCharacter: "4" },
  agent: { type: "rank", displayName: "Agent", displayCharacter: "5" },
  spy: { type: "rank", displayName: "Spy", displayCharacter: "6" },
  mastermind: {
    type: "rank",
    displayName: "Mastermind",
    displayCharacter: "7",
  },

  assassin: { type: "elite", displayName: "Assassin", displayCharacter: "A" },
  battlemaster: {
    type: "elite",
    displayName: "Battlemaster",
    displayCharacter: "B",
  },
  councillor: {
    type: "elite",
    displayName: "Councillor",
    displayCharacter: "C",
  },
};
