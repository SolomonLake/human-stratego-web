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
import { useCacheStore } from "../cache/useCache";
import { PALATTE } from "../theme/theme";
import { usePlayerMovedListener } from "./usePlayerMovedListener";

export const PLAYER_MESH_NAME = "player";

const PLAYER_DISCONNECT_TIMEOUT = 10 * 1000;

const checkPlayerTimedOut = (disconnectedAt: number | undefined) =>
  !!disconnectedAt && Date.now() - disconnectedAt > PLAYER_DISCONNECT_TIMEOUT;

export const Player = ({ userId, team }: { userId: string; team: Team }) => {
  const playerRef = useRef<Mesh | null>(null);
  const { cache } = useCacheStore();

  const initialPosition = useRef(cache.players[userId].position).current;

  const player = cache.players[userId];

  const [timedOut, setTimedOut] = useState(
    checkPlayerTimedOut(player.disconnectedAt)
  );
  useEffect(() => {
    if (player.disconnectedAt) {
      setTimeout(() => {
        setTimedOut(checkPlayerTimedOut(player.disconnectedAt));
      }, PLAYER_DISCONNECT_TIMEOUT + 100);
    } else {
      setTimedOut(false);
    }
  }, [player.disconnectedAt]);

  const livePosition = player.position;

  usePlayerMovedListener();

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

  const teamColor = Color3.FromHexString(PALATTE[team.color]).toColor4();

  if (timedOut) {
    return null;
  }

  return (
    <box
      name={PLAYER_MESH_NAME}
      ref={playerRef}
      position={
        new Vector3(
          initialPosition.x,
          initialPosition.y + AVATAR_HEIGHT / 2,
          initialPosition.z
        )
      }
      state={userId}
      onCreated={(box) => box.enableEdgesRendering()}
      edgesWidth={1}
      edgesColor={Color3.FromHexString(PALATTE.dark).toColor4()}
      rotation={new Vector3(0, initialPosition.yRotation, 0)}
      height={AVATAR_HEIGHT}
      width={AVATAR_WIDTH}
      depth={AVATAR_DEPTH}
      faceColors={[
        Color3.FromHexString(PALATTE.light).toColor4(), // front
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
        emissiveColor={Color3.FromHexString(PALATTE.light)}
      >
        <texture url="/images/raccoon-dance.jpg" level={0.8} />
      </standardMaterial>
    </box>
  );
};
