import { Vector3 } from "@babylonjs/core";
import { useEffect, useState } from "react";
import { AVATAR_HEIGHT, AVATAR_WIDTH } from "../avatar/Avatar";
import { useSocket } from "../sockets/useSocket";
import { useListenPlayerMove } from "./useListenPlayerMove";

type PlayerType = { userId: string; position: Vector3 };

export const Players = () => {
  // TODO: get player positions from websocket and update
  const [players, setPlayers] = useState<{ [userId: string]: PlayerType }>({});

  useListenPlayerMove((data) => {
    console.log("player move received", data);
    const player: PlayerType = {
      ...players[data.userId],
      position: new Vector3(
        data.position.x,
        data.position.y / 2,
        data.position.z
      ),
    };
    setPlayers({ ...players, [data.userId]: player });
  });

  return (
    <>
      {Object.values(players).map((player, index) => {
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
