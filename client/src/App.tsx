import { Color3, Mesh, Vector3 } from "@babylonjs/core";
import { Engine, Scene } from "react-babylonjs";
import { useEffect, useReducer, useRef } from "react";
import { Avatar } from "./features/avatar/Avatar";
import { ResizeEngine } from "./features/resize/ResizeEngine";
import { Players } from "./features/players/Players";

export const App = () => {
  const framesPerSecond = 60;
  const gravity = -9.81;

  return (
    <Engine
      adaptToDeviceRatio={false}
      antialias
      engineOptions={undefined}
      canvasId="babylon-canvas"
    >
      <ResizeEngine />
      <Scene
        key="arena-scene"
        gravity-y={gravity / framesPerSecond}
        collisionsEnabled
      >
        <hemisphericLight
          name="light1"
          direction={Vector3.Up()}
          intensity={0.7}
        />
        <ground
          name="ground"
          checkCollisions
          height={20}
          width={20}
          position={Vector3.Zero()}
        />
        <Avatar />
        <Players />
      </Scene>
    </Engine>
  );
};
