import { FreeCamera, Vector3 } from "@babylonjs/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useBeforeRender, useEngine } from "react-babylonjs";
import { useServerCacheOnce } from "../serverCache/useServerCacheOnce";
import { useSocket } from "../sockets/useSocket";
import { useUserId } from "../user/useUserId";
import { throttle } from "throttle-debounce";

export const AVATAR_HEIGHT = 1;
export const AVATAR_WIDTH = AVATAR_HEIGHT * 0.33;

const CAMERA_POSITION = { x: 0, y: 0, z: 0 };

export const Avatar = () => {
  const engine = useEngine();
  const cameraRef = useRef<FreeCamera | null>(null);
  const socket = useSocket();
  const userId = useUserId();

  const throttleEmitPlayerMove = useCallback(
    throttle(500, ({ x, y, z }: PlayerPosition) => {
      socket.emit("playerMove", {
        userId: userId,
        position: {
          x,
          y,
          z,
        },
      });
    }),
    [socket, userId]
  );

  const [initialPosition, setInitialPosition] =
    useState<PlayerPosition>(CAMERA_POSITION);

  const [cameraPosition, setCameraPosition] = useState(CAMERA_POSITION);

  useServerCacheOnce((cache) => {
    if (cache.players[userId]) {
      setInitialPosition(cache.players[userId].position);
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
      const y = cameraY - AVATAR_HEIGHT;
      if (
        cameraPosition.x !== x ||
        cameraPosition.y !== y ||
        cameraPosition.z !== z
      ) {
        const newPosition = { x, y, z };
        setCameraPosition(newPosition);
        throttleEmitPlayerMove(newPosition);
      }
    }
  });

  return (
    <freeCamera
      name="camera1"
      ref={cameraRef}
      keysUp={[87]}
      keysLeft={[65]}
      keysDown={[83]}
      keysRight={[68]}
      checkCollisions
      position={
        new Vector3(
          initialPosition.x,
          initialPosition.y + AVATAR_HEIGHT,
          initialPosition.z
        )
      }
      ellipsoid={
        new Vector3(AVATAR_WIDTH / 2, AVATAR_HEIGHT / 2, AVATAR_WIDTH / 2)
      }
      applyGravity
      speed={0.25}
      minZ={0.45}
    ></freeCamera>
  );
};
