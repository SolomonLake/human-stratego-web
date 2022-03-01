import { FreeCamera, Vector3 } from "@babylonjs/core";
import { useEffect, useRef } from "react";
import { useEngine, useScene } from "react-babylonjs";

export const AvatarCamera = ({}: {}) => {
  const engine = useEngine();
  const cameraRef = useRef<FreeCamera | null>(null);

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

  return (
    <freeCamera
      name="camera1"
      ref={cameraRef}
      keysUp={[87]}
      keysLeft={[65]}
      keysDown={[83]}
      keysRight={[68]}
      checkCollisions
      position={new Vector3(0, 5, 0)}
      ellipsoid={new Vector3(1, 1, 1)}
      applyGravity
      speed={0.75}
      minZ={0.45}
    ></freeCamera>
  );
};
