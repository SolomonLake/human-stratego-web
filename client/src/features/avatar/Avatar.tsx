import { Color3, Mesh, Vector3 } from "@babylonjs/core";
import { useEffect } from "react";
import { useBeforeRender } from "react-babylonjs";

export const AVATAR_HEIGHT = 0.3;
const AVATAR_WALK_SPEED = 0.007;

export const Avatar = ({
  avatarRef,
  activeInputUp,
  avatarAbsoluteRotation,
}: {
  avatarRef: React.MutableRefObject<Mesh | null>;
  activeInputUp: boolean;
  avatarAbsoluteRotation: number;
}) => {
  useBeforeRender(() => {
    const avatar = avatarRef.current;
    if (avatar) {
      if (activeInputUp) {
        const forward = new Vector3(
          AVATAR_WALK_SPEED * Math.cos(avatarAbsoluteRotation),
          0,
          AVATAR_WALK_SPEED * Math.sin(avatarAbsoluteRotation)
        );
        avatar.moveWithCollisions(forward);
      }
    }
  });

  return (
    <box
      name="avatar"
      ref={avatarRef}
      height={AVATAR_HEIGHT}
      width={0.1}
      depth={0.1}
      position={new Vector3(0, AVATAR_HEIGHT / 2, 0)}
    >
      <standardMaterial name="matAvatar" diffuseColor={Color3.Green()} />
    </box>
  );
};
