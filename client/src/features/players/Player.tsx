import {
  ActionManager,
  Color3,
  Color4,
  InterpolateValueAction,
  Mesh,
  Scalar,
  Vector3,
  Vector4,
} from "@babylonjs/core";
import { useEffect, useRef, useState } from "react";
import { useBeforeRender, useScene } from "react-babylonjs";
import { AVATAR_DEPTH, AVATAR_HEIGHT, AVATAR_WIDTH } from "../avatar/Avatar";
import { usePlayerMoveListener } from "./usePlayerMoveListener";

export const Player = ({
  userId,
  initialPlayer,
  team,
}: {
  userId: string;
  initialPlayer: Player;
  team: Team;
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
      const liveVector3 = new Vector3(
        livePosition.x,
        livePosition.y + AVATAR_HEIGHT / 2,
        livePosition.z
      );
      if (
        Math.round(livePosition.yRotation * 100) / 100 !==
        Math.round(playerMesh.rotation.y * 100) / 100
      ) {
        playerMesh.rotation.y = Scalar.Lerp(
          playerMesh.rotation.y,
          livePosition.yRotation,
          0.05
        );
      }
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

  const teamColor = Color3.FromHexString(team.hexColor).toColor4();

  return (
    <box
      name="player"
      ref={playerRef}
      position={
        new Vector3(
          initialPlayer.position.x,
          initialPlayer.position.y + AVATAR_HEIGHT / 2,
          initialPlayer.position.z
        )
      }
      onCreated={(box) => box.enableEdgesRendering()}
      edgesWidth={1}
      edgesColor={Color3.FromHexString("#3D405B").toColor4()}
      rotation={new Vector3(0, initialPlayer.position.yRotation, 0)}
      height={AVATAR_HEIGHT}
      width={AVATAR_WIDTH}
      depth={AVATAR_DEPTH}
      faceColors={[
        Color3.FromHexString("#F4F1DE").toColor4(), // front
        teamColor, // back
        teamColor, // right
        teamColor, // left,
        teamColor, // top or bottom,
        teamColor, // top or bottom,
      ]}
      faceUV={[
        new Vector4(0, 1, 1, 0),
        new Vector4(0, 0, 0, 0),
        new Vector4(0, 0, 0, 0),
        new Vector4(0, 0, 0, 0),
        new Vector4(0, 0, 0, 0),
        new Vector4(0, 0, 0, 0),
      ]}
    >
      <standardMaterial
        name="player-material"
        emissiveColor={Color3.FromHexString("#F4F1DE")}
      >
        <texture url="/images/raccoon-dance.jpg" level={0.8} />
      </standardMaterial>
    </box>
  );
};
