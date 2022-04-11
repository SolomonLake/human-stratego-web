import { Dispatch, ReactNode, useEffect, useReducer, useState } from "react";
import { useSocket } from "../sockets/useSocket";
import { CacheContext } from "./CacheContext";

type Action =
  | { type: "initialServerCache"; cache: ServerCache }
  | { type: "playerCardChanged"; payload: PlayerCardChangedEvent };

export type CacheState = ServerCache | undefined;

export type CacheStore = { cache: CacheState; dispatch: Dispatch<Action> };

export const initialCacheState: CacheState = undefined;

const cacheReducer = (cache: CacheState, action: Action): CacheState => {
  switch (action.type) {
    case "initialServerCache":
      return action.cache;
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
  }
};

export const CacheProvider = (props: { children: ReactNode }) => {
  const [cache, dispatch] = useReducer(cacheReducer, initialCacheState);

  const socket = useSocket();

  useEffect(() => {
    socket.once("serverCache", (cache) => {
      dispatch({ type: "initialServerCache", cache });
    });
  }, []);

  return (
    <CacheContext.Provider value={{ cache, dispatch }}>
      {props.children}
    </CacheContext.Provider>
  );
};
