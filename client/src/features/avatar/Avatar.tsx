import { FreeCamera, Vector3 } from "@babylonjs/core";
import { useEffect, useRef, useState } from "react";
import { useBeforeRender, useEngine, useScene } from "react-babylonjs";
import { updateAvatarPosition } from "../../networking";

export const AVATAR_HEIGHT = 1;
export const AVATAR_WIDTH = AVATAR_HEIGHT * 0.33;

const CAMERA_POSITION = new Vector3(0, AVATAR_HEIGHT, 0);

export const Avatar = ({}: {}) => {
  const engine = useEngine();
  const cameraRef = useRef<FreeCamera | null>(null);

  const [cameraPosition, setCameraPosition] = useState(
    new Vector3().copyFrom(CAMERA_POSITION)
  );

  useEffect(() => {
    const canvas = engine?.getRenderingCanvas();
    if (canvas) {
      canvas.onclick = function () {
        canvas.requestPointerLock =
          canvas.requestPointerLock ||
          canvas.mozRequestPointerLock ||
          canvas.webkitRequestPointerLock;

        canvas.requestPointerLock();
      };
    }
  });

  useBeforeRender(() => {
    // TODO: send position through websocket, better
    const camera = cameraRef.current;
    if (camera) {
      const { position } = camera;
      if (!position.equals(cameraPosition)) {
        setCameraPosition(new Vector3().copyFrom(position));
        updateAvatarPosition({ position });
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
      position={new Vector3().copyFrom(CAMERA_POSITION)}
      ellipsoid={
        new Vector3(AVATAR_WIDTH / 2, AVATAR_HEIGHT / 2, AVATAR_WIDTH / 2)
      }
      applyGravity
      speed={0.25}
      minZ={0.45}
    ></freeCamera>
  );
};
