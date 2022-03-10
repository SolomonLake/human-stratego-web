import {
  ActionManager,
  InterpolateValueAction,
  Mesh,
  Scalar,
  Vector3,
} from "@babylonjs/core";
import { useEffect, useRef, useState } from "react";
import { useBeforeRender, useScene } from "react-babylonjs";
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

  const [livePosition, setLivePosition] = useState<PlayerPosition>(
    initialPlayer.position
  );

  usePlayerMoveListener((ev) => {
    const playerMesh = playerRef.current;
    if (playerMesh && ev.userId === userId) {
      console.log("moving", ev);
      setLivePosition(ev.position);
    }
  });

  useBeforeRender(() => {
    const playerMesh = playerRef.current;
    if (playerMesh) {
      const { x, y, z } = playerMesh.position;
      const liveVector3 = new Vector3(
        livePosition.x,
        livePosition.y + AVATAR_HEIGHT / 2,
        livePosition.z
      );
      if (!liveVector3.equalsWithEpsilon(playerMesh.position, 0.1)) {
        Vector3.LerpToRef(
          playerMesh.position,
          liveVector3,
          0.01,
          playerMesh.position
        );
      }
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
