import { Engine, Nullable, Scene } from "@babylonjs/core";
import { useEffect } from "react";
import { setUpArenaLevel, onArenaLevelRender } from "../levels/arena";
import { setUpAvatar } from "../players/avatar";

const ANTIALIAS = true;
const ENGINE_OPTIONS = undefined;
const ADAPT_TO_DEVICE_RATIO = false;

const SCENE_OPTIONS = undefined;

export const useArenaScene = (
  canvasRef: React.MutableRefObject<
    Nullable<WebGLRenderingContext | HTMLCanvasElement>
  >
) => {
  useEffect(() => {
    if (canvasRef.current) {
      const engine = new Engine(
        canvasRef.current,
        ANTIALIAS,
        ENGINE_OPTIONS,
        ADAPT_TO_DEVICE_RATIO
      );
      const scene = new Scene(engine, SCENE_OPTIONS);
      scene.onReadyObservable.addOnce((scene) => {
        setUpArenaLevel(scene);
        setUpAvatar(scene);
      });

      engine.runRenderLoop(() => {
        onArenaLevelRender(scene);
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
};
