import { Vector3 } from "@babylonjs/core";
import { useEffect, useReducer, useState } from "react";
import { AVATAR_HEIGHT, AVATAR_WIDTH } from "../avatar/Avatar";
import { useServerCacheOnce } from "../serverCache/useServerCacheOnce";
import { useSocket } from "../sockets/useSocket";
import { useUserId } from "../user/useUserId";
import { usePlayerDisconnectListener } from "./usePlayerDisconnectListener";
import { usePlayerMoveListener } from "./usePlayerMoveListener";

type PlayerAction =
  | { type: "player/playerJoined"; event: PlayerJoinEvent }
  | { type: "player/playerMoved"; event: PlayerMoveEvent }
  | { type: "player/playerDisconnected"; event: PlayerDisconnectEvent }
  | { type: "player/playersReceived"; players: ServerCache["players"] };

const playersReducer = (state: PlayerMap, action: PlayerAction) => {
  switch (action.type) {
    case "player/playerJoined":
    case "player/playerMoved": {
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

  usePlayerMoveListener((ev) =>
    dispatch({ type: "player/playerMoved", event: ev })
  );
  usePlayerDisconnectListener((ev) =>
    dispatch({ type: "player/playerDisconnected", event: ev })
  );

  return (
    <>
      {Object.keys(playersState)
        .filter((playerId) => playerId !== userId)
        .map((playerId) => {
          const player = playersState[playerId];
          return (
            <box
              name={`player-${playerId}`}
              key={playerId}
              position={
                new Vector3(
                  player.position.x,
                  player.position.y + AVATAR_HEIGHT / 2,
                  player.position.z
                )
              }
              height={AVATAR_HEIGHT}
              width={AVATAR_WIDTH}
              depth={AVATAR_WIDTH}
            />
          );
        })}
    </>
  );
};
