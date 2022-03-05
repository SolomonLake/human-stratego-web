import { Vector3 } from "@babylonjs/core";
import { useEffect, useReducer, useState } from "react";
import { AVATAR_HEIGHT, AVATAR_WIDTH } from "../avatar/Avatar";
import { useSocket } from "../sockets/useSocket";
import { usePlayerDisconnectListener } from "./usePlayerDisconnectListener";
import { usePlayerMoveListener } from "./usePlayerMoveListener";

type PlayerAction =
  | { type: "player/playerMoved"; event: PlayerMoveEvent }
  | { type: "player/playerDisconnected"; event: PlayerDisconnectEvent }
  | { type: "player/playersReceived"; players: ServerCache["players"] };

const playersReducer = (state: PlayerMap, action: PlayerAction) => {
  switch (action.type) {
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
      const { [action.event.userId]: _, ...restState } = state;
      return restState;
    }
    case "player/playersReceived": {
      return action.players;
    }
  }
};

export const Players = () => {
  const [playersState, dispatch] = useReducer(playersReducer, {});
  const socket = useSocket();

  useEffect(() => {
    socket.once("serverCache", (cache) =>
      dispatch({ type: "player/playersReceived", players: cache.players })
    );
  });

  usePlayerMoveListener((ev) =>
    dispatch({ type: "player/playerMoved", event: ev })
  );
  usePlayerDisconnectListener((ev) =>
    dispatch({ type: "player/playerDisconnected", event: ev })
  );

  return (
    <>
      {Object.values(playersState).map((player, index) => {
        return (
          <box
            name={`player-${index}`}
            key={index}
            position={
              new Vector3(
                player.position.x,
                player.position.y / 2,
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
