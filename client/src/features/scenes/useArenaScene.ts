import { Engine, Scene } from "@babylonjs/core";
import { useEffect } from "react";
import { onSetUpArenaLevel } from "../levels/onSetUpArenaLevel";
import { onRenderArenaLevel } from "../levels/onRenderArenaLevel";
import { setUpAvatar } from "../players/avatar";
import { appDispatch } from "../../App";

const SCENE_OPTIONS = undefined;

export const useArenaScene = (engine: Engine | null) => {
  useEffect(() => {
    const increment = () => {
      appDispatch({ type: "increment" });
    };
    window.addEventListener("keydown", increment);

    if (engine) {
      const scene = new Scene(engine, SCENE_OPTIONS);
      scene.onReadyObservable.addOnce((scene) => {
        onSetUpArenaLevel(scene);
        setUpAvatar(scene);
      });

      engine.runRenderLoop(() => {
        onRenderArenaLevel(scene);
        scene.render();
      });
    }
    return () => {
      if (window) {
        window.removeEventListener("keydown", increment);
      }
    };
  }, [engine]);
};
