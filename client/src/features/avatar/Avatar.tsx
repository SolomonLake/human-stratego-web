import {
  Axis,
  Color3,
  Mesh,
  Quaternion,
  Space,
  Vector3,
} from "@babylonjs/core";
import { useEffect } from "react";
import { useBeforeRender } from "react-babylonjs";
import { Inputs } from "../../App";

export const AVATAR_HEIGHT = 0.3;
const AVATAR_WALK_SPEED = 0.007;
const ROTATION_SPEED = 0.01;

export const Avatar = ({
  avatarRef,
  activeInputs,
}: {
  avatarRef: React.MutableRefObject<Mesh | null>;
  activeInputs: Inputs;
}) => {
  const rotate = (isLeft: boolean, avatar: Mesh) => {
    //Turning left
    if (isLeft) {
      avatar.rotate(Axis.Y, ROTATION_SPEED, Space.WORLD);
      //Turning right
    } else {
      avatar.rotate(Axis.Y, -ROTATION_SPEED, Space.WORLD);
    }
  };

  useBeforeRender(() => {
    const avatar = avatarRef.current;
    if (avatar) {
      if (activeInputs.up) {
        const rotation = Quaternion.Identity();
        avatar.getWorldMatrix().decompose(undefined, rotation);
        console.log(rotation.y);

        // const qrotation = avatar.rotationQuaternion?.toEulerAngles().y || 0;
        // const forward = new Vector3(
        //   AVATAR_WALK_SPEED * Math.cos(qrotation),
        //   0,
        //   AVATAR_WALK_SPEED * Math.sin(qrotation)
        // );
        const forward = avatar.calcMovePOV(0, 0, AVATAR_WALK_SPEED);
        console.log("for", forward, avatar.rotationQuaternion?.toEulerAngles());
        avatar.moveWithCollisions(forward);
      }
      if (activeInputs.left) {
        rotate(false, avatar);
      }
      if (activeInputs.right) {
        rotate(true, avatar);
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
