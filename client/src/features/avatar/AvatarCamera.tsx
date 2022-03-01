import { FreeCamera, Vector3 } from "@babylonjs/core";
import { useEffect, useRef } from "react";
import { useEngine, useScene } from "react-babylonjs";

export const AvatarCamera = ({}: {}) => {
  const engine = useEngine();
  const scene = useScene();
  const cameraRef = useRef<FreeCamera | null>(null);

  useEffect(() => {
    const camera = cameraRef.current;
    const canvas = engine?.getRenderingCanvas();
    if (camera && scene && canvas) {
      scene.activeCamera = camera;
      camera.attachControl(canvas, true);

      camera.keysUp.push(87);
      camera.keysLeft.push(65);
      camera.keysDown.push(83);
      camera.keysRight.push(68);

      camera.minZ = 0.45;

      canvas.onclick = function () {
        canvas.requestPointerLock =
          canvas.requestPointerLock ||
          canvas.mozRequestPointerLock ||
          canvas.webkitRequestPointerLock;

        // Ask the browser to lock the pointer)
        canvas.requestPointerLock();
      };
    }
  });

  return (
    <freeCamera
      name="camera1"
      ref={cameraRef}
      checkCollisions
      position={new Vector3(0, 5, 0)}
      ellipsoid={new Vector3(1, 1, 1)}
      applyGravity
      speed={0.75}
      minZ={0.45}
    ></freeCamera>
  );
};
