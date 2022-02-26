import {
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from "@babylonjs/core";
import { v4 as uuidv4 } from "uuid";
import { state } from "../../App";
import { AVATAR_HEIGHT } from "../players/avatar";

export const arenaLevel = {
  box: {
    name: uuidv4(),
    onSetUp: (scene: Scene) => {
      const box = MeshBuilder.CreateBox(
        arenaLevel.box.name,
        { size: 2 },
        scene
      );
      // Move the box upward 1/2 its height
      box.position.y = 1;
    },
    onRender: (scene: Scene) => {
      const box = scene.getMeshByName(arenaLevel.box.name);
      if (box) {
        var deltaTimeInMillis = scene.getEngine().getDeltaTime();

        const rpm = 10;
        box.rotation.y +=
          (rpm / 60) * Math.PI * (2 + state.count) * (deltaTimeInMillis / 1000);
      }
    },
  },
  camera: {
    name: uuidv4(),
    cameraDistance: 1.5,
    onSetUp: (scene: Scene) => {
      const camera = new FreeCamera(
        arenaLevel.camera.name,
        Vector3.Zero(),
        scene
      );
      camera.position.x -=
        Math.sin(-Math.PI / 2) * -1 * arenaLevel.camera.cameraDistance;
      camera.position.y = AVATAR_HEIGHT + AVATAR_HEIGHT / 2;
      camera.position.z -=
        Math.cos(-Math.PI / 2) * -1 * arenaLevel.camera.cameraDistance;
      camera.setTarget(new Vector3(0, AVATAR_HEIGHT + AVATAR_HEIGHT / 2, 0));

      if (scene.activeCameras) {
        scene.activeCameras.push(camera);
      }
    },
    onRender: (scene: Scene) => {
      const { name, cameraDistance } = arenaLevel.camera;
      const camera = scene.getCameraByName(name) as FreeCamera | null;
      const { avatar } = state;
      if (camera && avatar !== null) {
        camera.position.x = avatar.mesh.position.x;
        camera.position.y = avatar.mesh.position.y + AVATAR_HEIGHT;
        camera.position.z = avatar.mesh.position.z;
        camera.position.z -=
          Math.sin(avatar.absoluteRotation - Math.PI) * -1 * cameraDistance;
        camera.position.x -=
          Math.cos(avatar.absoluteRotation - Math.PI) * -1 * cameraDistance;
        const lookAt = new Vector3(
          avatar.mesh.position.x,
          avatar.mesh.position.y + AVATAR_HEIGHT,
          avatar.mesh.position.z
        );
        camera.setTarget(lookAt);
      }
    },
  },
  ground: {
    name: uuidv4(),
    onSetUp: (scene: Scene) => {
      const ground = MeshBuilder.CreateGround(
        arenaLevel.ground.name,
        { width: 6, height: 6 },
        scene
      );
      ground.position = Vector3.Zero();
    },
  },
  light: {
    name: uuidv4(),
    onSetUp: (scene: Scene) => {
      // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
      const light = new HemisphericLight(
        arenaLevel.light.name,
        new Vector3(0, 1, 0),
        scene
      );
      // Default intensity is 1. Let's dim the light a small amount
      light.intensity = 0.7;
    },
  },
};
