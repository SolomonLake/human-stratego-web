import { Vector3 } from "@babylonjs/core";
import { useEffect, useState } from "react";
import { AVATAR_HEIGHT, AVATAR_WIDTH } from "../avatar/Avatar";
import { useSocket } from "../sockets/useSocket";

type PlayerType = { userId: string; position: Vector3 };

export const Players = () => {
  const [players, setPlayers] = useState<{ [userId: string]: PlayerType }>({});
  const socket = useSocket();

  useEffect(() => {
    const onPlayerMove = (data: PlayerMoveEvent) => {
      const player: PlayerType = {
        ...players[data.userId],
        userId: data.userId,
        position: new Vector3(
          data.position.x,
          data.position.y / 2,
          data.position.z
        ),
      };
      setPlayers({ ...players, [data.userId]: player });
    };
    socket.on("playerMove", onPlayerMove);

    return () => {
      socket.off("playerMove", onPlayerMove);
    };
  }, [socket]);

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
