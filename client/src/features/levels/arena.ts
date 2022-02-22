import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Mesh,
} from "@babylonjs/core";

const setUpCamera = (scene: Scene) => {
  // This creates and positions a free camera (non-mesh)
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();
  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);
};

const setUpLight = (scene: Scene) => {
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;
};

const setUpBox = (scene: Scene) => {
  // Our built-in 'box' shape.
  const box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
  // Move the box upward 1/2 its height
  box.position.y = 1;
};

const setUpGround = (scene: Scene) => {
  // Our built-in 'ground' shape.
  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 6, height: 6 },
    scene
  );
  ground.position = Vector3.Zero();
};

export const setUpArenaLevel = (scene: Scene) => {
  setUpCamera(scene);
  setUpLight(scene);
  // setUpBox(scene);
  setUpGround(scene);
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
export const onArenaLevelRender = (scene: Scene) => {
  const box = scene.getMeshByName("box");
  if (box) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};
