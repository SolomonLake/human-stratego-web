import { useEffect, useRef } from "react";
import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Mesh,
} from "@babylonjs/core";

const onSceneReady = (scene: Scene) => {
  // This creates and positions a free camera (non-mesh)
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();
  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'box' shape.
  const box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
  // Move the box upward 1/2 its height
  box.position.y = 1;

  // Our built-in 'ground' shape.
  MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: Scene) => {
  const box = scene.getMeshByName("box");
  if (box) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

const ANTIALIAS = true;
const ENGINE_OPTIONS = undefined;
const ADAPT_TO_DEVICE_RATIO = false;

const SCENE_OPTIONS = undefined;

export const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const engine = new Engine(
        canvasRef.current,
        ANTIALIAS,
        ENGINE_OPTIONS,
        ADAPT_TO_DEVICE_RATIO
      );
      const scene = new Scene(engine, SCENE_OPTIONS);
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));

      engine.runRenderLoop(() => {
        onRender(scene);
        scene.render();
      });

      const resize = () => {
        scene.getEngine().resize();
      };

      if (window) {
        window.addEventListener("resize", resize);
      }

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener("resize", resize);
        }
      };
    }
  }, [canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      id="my-canvas"
      style={{ position: "absolute", height: "100%", width: "100%" }}
    />
  );
};

export default App;
