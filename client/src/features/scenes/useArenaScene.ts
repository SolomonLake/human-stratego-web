import { Engine, Nullable, Scene } from "@babylonjs/core";
import { useEffect } from "react";
import { onSetUpArenaLevel } from "../levels/onSetUpArenaLevel";
import { onRenderArenaLevel } from "../levels/onRenderArenaLevel";
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
        onSetUpArenaLevel(scene);
        setUpAvatar(scene);
      });

      engine.runRenderLoop(() => {
        onRenderArenaLevel(scene);
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
