import { Vector3 } from "@babylonjs/core";
import { useEffect, useReducer, useState } from "react";
import { AVATAR_HEIGHT, AVATAR_WIDTH } from "../avatar/Avatar";
import { useSocket } from "../sockets/useSocket";
import { usePlayerDisconnectListener } from "./usePlayerDisconnectListener";
import { usePlayerMoveListener } from "./usePlayerMoveListener";

export type PlayerType = { userId: string; position: Vector3 };

export type PlayerMap = { [userId: string]: PlayerType };

type PlayerAction =
  | { type: "player/playerMoved"; event: PlayerMoveEvent }
  | { type: "player/playerDisconnected"; event: PlayerDisconnectEvent };

const reducer = (state: PlayerMap, action: PlayerAction) => {
  switch (action.type) {
    case "player/playerMoved": {
      const { userId, position } = action.event;
      return {
        ...state,
        [userId]: {
          ...state[userId],
          userId: userId,
          position: new Vector3(position.x, position.y / 2, position.z),
        },
      };
    }
    case "player/playerDisconnected": {
      const { [action.event.userId]: _, ...restState } = state;
      return restState;
    }
  }
};

export const Players = () => {
  const [playersState, dispatch] = useReducer(reducer, {});

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
            position={player.position}
            height={AVATAR_HEIGHT}
            width={AVATAR_WIDTH}
            depth={AVATAR_WIDTH}
          />
        );
      })}
    </>
  );
};
