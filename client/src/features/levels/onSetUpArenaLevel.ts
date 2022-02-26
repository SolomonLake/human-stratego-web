import { Scene } from "@babylonjs/core";
import { arenaLevel } from "./arenaLevel";

export const onSetUpArenaLevel = (scene: Scene) => {
  arenaLevel.camera.onSetUp(scene);
  arenaLevel.light.onSetUp(scene);
  // arenaLevel.box.onSetUp(scene);
  arenaLevel.ground.onSetUp(scene);
};
