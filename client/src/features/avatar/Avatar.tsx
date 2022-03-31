import { FreeCamera, Vector3 } from "@babylonjs/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useBeforeRender, useEngine } from "react-babylonjs";
import { useServerCacheOnce } from "../serverCache/useServerCacheOnce";
import { useSocket } from "../sockets/useSocket";
import { useUserId } from "../user/useUserId";
import { throttle } from "throttle-debounce";
import { CollisionMask } from "../collision/collision";
import { PALATTE } from "../theme/theme";
import { Control } from "@babylonjs/gui";
import { CARDS } from "../cards/cards";

export const AVATAR_HEIGHT = 1;
export const AVATAR_FOREHEAD_HEIGHT = 0.05;
export const AVATAR_WIDTH = AVATAR_HEIGHT * 0.33;
export const AVATAR_DEPTH = AVATAR_HEIGHT * 0.15;

const CAMERA_POSITION = { x: 0, y: 0, z: 0, yRotation: 0 };

export const Avatar = () => {
  const engine = useEngine();
  const cameraRef = useRef<FreeCamera | null>(null);
  const socket = useSocket();
  const userId = useUserId();
  // const [teamId, setTeamId] = useState<TeamId | undefined>();

  const throttleEmitPlayerMove = useCallback(
    throttle(500, ({ x, y, z, yRotation }: PlayerPosition) => {
      socket.emit("playerMove", {
        userId: userId,
        position: {
          x,
          y,
          z,
          yRotation,
        },
      });
    }),
    [socket, userId]
  );

  const [initialPosition, setInitialPosition] =
    useState<PlayerPosition>(CAMERA_POSITION);

  const [cardId, setCardId] = useState<CardId | undefined>(undefined);

  const [cameraPosition, setCameraPosition] = useState(CAMERA_POSITION);

  useServerCacheOnce((cache) => {
    const player = cache.players[userId];
    if (player) {
      setInitialPosition(player.position);
      setCardId(player.cardId);
      // setTeamId(player.teamId);
    } else {
      throw new Error("No current player in cache...");
    }
  });

  useEffect(() => {
    const canvas = engine?.getRenderingCanvas();
    if (canvas && engine) {
      canvas.onclick = function () {
        canvas.requestPointerLock =
          canvas.requestPointerLock ||
          canvas.mozRequestPointerLock ||
          canvas.webkitRequestPointerLock;

        canvas.requestPointerLock();
      };
      canvas.tabIndex = engine.canvasTabIndex;
      canvas.focus();
    }
  });

  useBeforeRender(() => {
    const camera = cameraRef.current;
    if (camera) {
      const { x, y: cameraY, z } = camera.position;
      const y = cameraY - AVATAR_HEIGHT + AVATAR_FOREHEAD_HEIGHT;
      const yRotation = camera.rotation.y;
      if (
        cameraPosition.x !== x ||
        cameraPosition.y !== y ||
        cameraPosition.z !== z ||
        cameraPosition.yRotation !== yRotation
      ) {
        const newPosition = { x, y, z, yRotation };
        setCameraPosition(newPosition);
        throttleEmitPlayerMove(newPosition);
      }
    }
  });

  return (
    <>
      <freeCamera
        name="camera1"
        ref={cameraRef}
        keysUp={[87]}
        keysLeft={[65]}
        keysDown={[83]}
        keysRight={[68]}
        checkCollisions
        collisionMask={CollisionMask.Avatar}
        ellipsoidOffset-y={AVATAR_FOREHEAD_HEIGHT}
        position={
          new Vector3(
            initialPosition.x,
            initialPosition.y + AVATAR_HEIGHT,
            initialPosition.z
          )
        }
        rotation={new Vector3(0, initialPosition.yRotation, 0)}
        ellipsoid={
          new Vector3(AVATAR_WIDTH / 2, AVATAR_HEIGHT / 2, AVATAR_DEPTH / 2)
        }
        applyGravity
        speed={0.1}
        minZ={0.01}
      ></freeCamera>

      <adtFullscreenUi name="fullscreen-ui">
        {/* 👆✖👁️‍🗨️🦝♠🔘 */}
        <textBlock
          name="crosshair-ui"
          text="✖"
          scaleX={0.4}
          scaleY={0.4}
          color={PALATTE.light}
        />
        {cardId && (
          <rectangle
            name="card-ui"
            width={0.1}
            height={0.25}
            color={PALATTE.team1}
            cornerRadius={20}
            background={PALATTE.light}
            verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
            horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
            paddingTop={"15px"}
            paddingLeft={"15px"}
            thickness={6}
          >
            <textBlock
              name="card-text-ui"
              text={CARDS[cardId].displayCharacter}
              fontSize={60}
            />
          </rectangle>
        )}
      </adtFullscreenUi>
    </>
  );
};
