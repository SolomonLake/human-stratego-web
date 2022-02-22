import {
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from "@babylonjs/core";

export const arenaLevel = {
  box: {
    name: "box",
    onSetUp: (scene: Scene) => {
      const box = MeshBuilder.CreateBox(
        arenaLevel.box.name,
        { size: 2 },
        scene
      );
      // Move the box upward 1/2 its height
      box.position.y = 1;
    },
  },
  camera: {
    name: "camera1",
    onSetUp: (scene: Scene) => {
      // This creates and positions a free camera (non-mesh)
      const camera = new FreeCamera(
        arenaLevel.camera.name,
        new Vector3(0, 5, -10),
        scene
      );
      // This targets the camera to scene origin
      camera.setTarget(Vector3.Zero());

      const canvas = scene.getEngine().getRenderingCanvas();
      // This attaches the camera to the canvas
      camera.attachControl(canvas, true);
    },
  },
  ground: {
    name: "ground",
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
    name: "light1",
    onSetUp: (scene: Scene) => {
      // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
      const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
      // Default intensity is 1. Let's dim the light a small amount
      light.intensity = 0.7;
    },
  },
};
