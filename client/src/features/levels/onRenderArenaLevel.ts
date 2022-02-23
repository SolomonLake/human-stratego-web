import { Scene } from "@babylonjs/core";
import { State } from "../../App";
import { arenaLevel } from "./arenaLevel";

export const onRenderArenaLevel = (scene: Scene) => {
  arenaLevel.box.onRender(scene);
};
