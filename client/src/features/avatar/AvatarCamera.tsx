import { FreeCamera, Mesh, Vector3 } from "@babylonjs/core";
import { useRef } from "react";
import { useBeforeRender } from "react-babylonjs";

const CAMERA_DISTANCE = 1.5;
const ABSOLUTE_ROTATION = 0;
export const AVATAR_HEIGHT = 0.3;

export const AvatarCamera = ({
  avatarRef,
}: {
  avatarRef: React.MutableRefObject<Mesh | null>;
}) => {
  const cameraRef = useRef<FreeCamera | null>(null);

  useBeforeRender(() => {
    const camera = cameraRef.current;
    const avatar = avatarRef.current;
    if (camera && avatar) {
      camera.position.y = avatar.position.y + AVATAR_HEIGHT;
      camera.position.z =
        avatar.position.z -
        Math.sin(ABSOLUTE_ROTATION - Math.PI) * -1 * CAMERA_DISTANCE;
      camera.position.x =
        avatar.position.x -
        Math.cos(ABSOLUTE_ROTATION - Math.PI) * -1 * CAMERA_DISTANCE;
      const lookAt = new Vector3(
        avatar.position.x,
        avatar.position.y + AVATAR_HEIGHT,
        avatar.position.z
      );
      camera.setTarget(lookAt);
    }
  });

  return (
    <freeCamera name="camera1" ref={cameraRef} position={Vector3.Zero()} />
  );
};
