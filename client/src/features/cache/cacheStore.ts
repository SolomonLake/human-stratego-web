import { Dispatch } from "react";

type Action =
  | { type: "initialServerCache"; cache: ServerCache }
  | { type: "playerJoined"; event: PlayerJoinedEvent }
  | { type: "playerDisconnected"; event: PlayerDisconnectedEvent }
  | { type: "playerCardChanged"; payload: PlayerCardChangedEvent }
  | {
      type: "playerConfrontationResolved";
      event: PlayerConfrontationResolvedEvent;
    }
  | { type: "playerMoved"; payload: PlayerMovedEvent };

export type CacheState = ServerCache;

export type CacheStore = { cache: CacheState; dispatch: Dispatch<Action> };

const initialCardCounts = {
  "1": 0,
  "2": 0,
  "3": 0,
  "4": 0,
  "5": 0,
  "6": 0,
  a: 0,
  b: 0,
  c: 0,
  bomb: 0,
};

export const initialCacheState: CacheState = {
  teams: {
    "1": { color: "team1", side: 1, cardCounts: initialCardCounts },
    "2": { color: "team2", side: -1, cardCounts: initialCardCounts },
  },
  players: {},
};

export const cacheReducer = (cache: CacheState, action: Action): CacheState => {
  switch (action.type) {
    case "initialServerCache":
      return action.cache;
    case "playerJoined":
      return {
        ...cache,
        players: {
          ...cache.players,
          [action.event.userId]: action.event.player,
        },
      };
    case "playerDisconnected":
      return {
        ...cache,
        players: {
          ...cache.players,
          [action.event.userId]: {
            ...cache.players[action.event.userId],
            disconnectedAt: action.event.disconnectedAt,
          },
        },
      };
    case "playerCardChanged":
      const player = cache?.players[action.payload.userId];
      if (player) {
        return {
          ...cache,
          teams: {
            ...cache.teams,
            [player.teamId]: {
              ...cache.teams[player.teamId],
              cardCounts: {
                ...cache.teams[player.teamId].cardCounts,
                [action.payload.cardId]:
                  cache.teams[player.teamId].cardCounts[action.payload.cardId] -
                  1,
                [player.cardId]:
                  cache.teams[player.teamId].cardCounts[player.cardId] + 1,
              },
            },
          },
          players: {
            ...cache.players,
            [action.payload.userId]: {
              ...cache.players[action.payload.userId],
              cardId: action.payload.cardId,
            },
          },
        };
      } else {
        return cache;
      }
    case "playerConfrontationResolved":
      return {
        ...cache,
        // TODO: figure out how to represent the data needed for a confrontation
      };
    case "playerMoved":
      return {
        ...cache,
        players: {
          ...cache.players,
          [action.payload.userId]: {
            ...cache.players[action.payload.userId],
            position: action.payload.position,
          },
        },
      };
  }
};
