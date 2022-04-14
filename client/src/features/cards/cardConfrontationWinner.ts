import { Card, CARDS } from "./cards";

export const cardConfrontationWinner = ({
  defendingUserId,
  defendingUserCardId,
  attackingUserId,
  attackingUserCardId,
}: PlayerConfrontationResolvedEvent): string => {
  const defendingUserCard = CARDS[defendingUserCardId];
  const attackingUserCard = CARDS[attackingUserCardId];

  // Check bombs first.
  // Defending bomb wins if attacking card doesn't counter.
  if (defendingUserCard.type === "bomb") {
    return cardCountersBomb(attackingUserCard)
      ? attackingUserId
      : defendingUserId;
  }
  if (attackingUserCard.type === "bomb") {
    throw new Error("Bombs cannot attack");
  }

  // Next, if there is a tie, win goes to defender.
  if (defendingUserCardId === attackingUserCardId) {
    return defendingUserId;
  }

  // Then if both cards are elite, check the triangle.
  if (
    defendingUserCard.type === "elite" &&
    attackingUserCard.type === "elite"
  ) {
    if (defendingUserCard.eliteRank === "a") {
      return attackingUserCard.eliteRank === "b"
        ? defendingUserId
        : attackingUserId;
    }
    if (defendingUserCard.eliteRank === "b") {
      return attackingUserCard.eliteRank === "c"
        ? defendingUserId
        : attackingUserId;
    }
    if (defendingUserCard.eliteRank === "c") {
      return attackingUserCard.eliteRank === "a"
        ? defendingUserId
        : attackingUserId;
    }
  }

  // If one card is elite, at this point that card wins
  if (defendingUserCard.type === "elite") {
    return defendingUserId;
  }
  if (attackingUserCard.type === "elite") {
    return attackingUserId;
  }

  // Now we know both cards are rank cards, so we can check
  // which card wins based on the rank.
  return defendingUserCard.rank > attackingUserCard.rank
    ? defendingUserId
    : attackingUserId;
};

const cardCountersBomb = (card: Card): boolean => {
  return card.type === "rank" && card.rank === 2;
};
