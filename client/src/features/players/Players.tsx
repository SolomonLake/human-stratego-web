import { useEffect, useReducer, useState } from "react";
import { useServerCacheOnce } from "../serverCache/useServerCacheOnce";
import { useSocket } from "../sockets/useSocket";
import { useUserId } from "../user/useUserId";
import { Player } from "./Player";
import { usePlayerDisconnectListener } from "./usePlayerDisconnectListener";

type PlayerAction =
  | { type: "player/playerJoined"; event: PlayerJoinEvent }
  | { type: "player/playerDisconnected"; event: PlayerDisconnectEvent }
  | { type: "player/playersReceived"; players: ServerCache["players"] };

const playersReducer = (state: PlayerMap, action: PlayerAction) => {
  switch (action.type) {
    case "player/playerJoined": {
      const { userId, position } = action.event;
      return {
        ...state,
        [userId]: {
          ...state[userId],
          position,
        },
      };
    }
    case "player/playerDisconnected": {
      const { userId, disconnectedAt } = action.event;
      return {
        ...state,
        [userId]: {
          ...state[userId],
          disconnectedAt,
        },
      };
    }
    case "player/playersReceived": {
      return action.players;
    }
  }
};

export const Players = () => {
  const [playersState, dispatch] = useReducer(playersReducer, {});
  const socket = useSocket();
  const userId = useUserId();

  useServerCacheOnce((cache) =>
    dispatch({ type: "player/playersReceived", players: cache.players })
  );

  useEffect(() => {
    const onPlayerJoin = (ev: PlayerJoinEvent) => {
      dispatch({ type: "player/playerJoined", event: ev });
    };
    socket.on("playerJoin", onPlayerJoin);
    return () => {
      socket.off("playerJoin", onPlayerJoin);
    };
  });

  usePlayerDisconnectListener((ev) =>
    dispatch({ type: "player/playerDisconnected", event: ev })
  );

  return (
    <>
      {Object.keys(playersState)
        .filter((playerId) => playerId !== userId)
        .map((playerId) => {
          return (
            <Player
              key={playerId}
              userId={playerId}
              initialPlayer={playersState[playerId]}
            />
          );
        })}
    </>
  );
};
