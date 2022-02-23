import {
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from "@babylonjs/core";
import { v4 as uuidv4 } from "uuid";
import { state } from "../../App";

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
      // This creates and positions a free camera (non-mesh)
      const camera = new FreeCamera(
        arenaLevel.camera.name,
        new Vector3(0, 5, -10),
        scene
      );
      camera.setTarget(Vector3.Zero());
      const canvas = scene.getEngine().getRenderingCanvas();
      // This attaches the camera to the canvas
      camera.attachControl(canvas, true);
      // camera.position.x -=
      //   Math.sin(-Math.PI / 2) * -1 * arenaLevel.camera.cameraDistance;
      // camera.position.y = Avatar.height + Avatar.height / 2;
      // camera.position.z -=
      //   Math.cos(-Math.PI / 2) * -1 * arenaLevel.camera.cameraDistance;
      // var lookAt = Vector3.Zero();
      // lookAt.y = Avatar.height + Avatar.height / 2;
      // camera.setTarget(lookAt);

      // if (scene.activeCameras) {
      //   scene.addCamera(camera)
      //   scene.activeCameras.push(camera);
      // }
    },
    onRender: (scene: Scene, Avatar: any) => {
      // const camera = scene.getCameraByName(arenaLevel.camera.name);
      // if (Avatar.mesh !== null) {
      //   World.camera.position.x = Avatar.mesh.position.x;
      //   World.camera.position.y = Avatar.mesh.position.y + Avatar.height;
      //   World.camera.position.z = Avatar.mesh.position.z;
      //   World.camera.position.z -=
      //     Math.sin(Avatar.absoluteRotation - Math.PI) *
      //     -1 *
      //     World.cameraDistance;
      //   World.camera.position.x -=
      //     Math.cos(Avatar.absoluteRotation - Math.PI) *
      //     -1 *
      //     World.cameraDistance;
      //   var lookAt = new BABYLON.Vector3(
      //     Avatar.mesh.position.x,
      //     Avatar.mesh.position.y + Avatar.height,
      //     Avatar.mesh.position.z
      //   );
      //   World.camera.setTarget(lookAt);
      // }
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
