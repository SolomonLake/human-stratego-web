import { Scene } from "@babylonjs/core";

export const onRenderArenaLevel = (scene: Scene) => {
  const box = scene.getMeshByName("box");
  if (box) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};
