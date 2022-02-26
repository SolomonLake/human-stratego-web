import {
  Color3,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { createContext } from "react";

const ABSOLUTE_ROTATION = 0;
export const AVATAR_HEIGHT = 0.3;
const MESH = null;
const ROTATION_SPEED = 0.01;
const WALK_SPEED = 0.007;

export const avatarState = { mesh: null };

export const setUpAvatar = (scene: Scene) => {
  const mesh = MeshBuilder.CreateBox(
    "avatar",
    { height: AVATAR_HEIGHT, width: 0.1, depth: 0.1 },
    scene
  );
  mesh.position = Vector3.Zero();
  mesh.position.y = AVATAR_HEIGHT / 2;
  const material = new StandardMaterial("matAvatar", scene);
  material.diffuseColor = Color3.Green();
  mesh.material = material;
  // new Billboard(mesh, username);
};
