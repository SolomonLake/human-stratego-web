import { Mesh, Vector3 } from "@babylonjs/core";
import { useRef } from "react";
import { AVATAR_HEIGHT, AVATAR_WIDTH } from "../avatar/Avatar";
import { usePlayerMoveListener } from "./usePlayerMoveListener";

export const Player = ({
  userId,
  initialPlayer,
}: {
  userId: string;
  initialPlayer: Player;
}) => {
  const playerRef = useRef<Mesh | null>(null);

  usePlayerMoveListener((ev) => {
    const playerMesh = playerRef.current;
    if (playerMesh && ev.userId === userId) {
      console.log("moving", ev);
      playerMesh.position.x = ev.position.x;
      playerMesh.position.y = ev.position.y + AVATAR_HEIGHT / 2;
      playerMesh.position.z = ev.position.z;
      // playerRef.current.transform(data.x, data.y, data.z, data.rotation);
    }
  });

  return (
    <box
      name={`player-${userId}`}
      ref={playerRef}
      position={
        new Vector3(
          initialPlayer.position.x,
          initialPlayer.position.y + AVATAR_HEIGHT / 2,
          initialPlayer.position.z
        )
      }
      height={AVATAR_HEIGHT}
      width={AVATAR_WIDTH}
      depth={AVATAR_WIDTH}
    />
  );
};
