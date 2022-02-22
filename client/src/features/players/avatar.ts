import {
  Color3,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";

const ABSOLUTE_ROTATION = 0;
const HEIGHT = 0.3;
const MESH = null;
const ROTATION_SPEED = 0.01;
const WALK_SPEED = 0.007;

export const setUpAvatar = (scene: Scene) => {
  const mesh = MeshBuilder.CreateBox(
    "avatar",
    { height: HEIGHT, width: 0.1, depth: 0.1 },
    scene
  );
  mesh.position = Vector3.Zero();
  mesh.position.y = HEIGHT / 2;
  const material = new StandardMaterial("matAvatar", scene);
  material.diffuseColor = Color3.Green();
  mesh.material = material;
  // new Billboard(mesh, username);
};
