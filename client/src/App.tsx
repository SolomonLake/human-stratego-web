import { Color3, Mesh, Vector3 } from "@babylonjs/core";
import { Engine, Scene } from "react-babylonjs";
import { useEffect, useReducer, useRef } from "react";
import { AvatarCamera } from "./features/avatar/AvatarCamera";
import { ResizeEngine } from "./features/resize/ResizeEngine";

export type State = {
  avatar: { absoluteRotation: number; mesh: { position: Vector3 } };
  temp: {
    activeInputs: {
      up: boolean;
      down: boolean;
      left: boolean;
      right: boolean;
    };
  };
};
export type Inputs = State["temp"]["activeInputs"];
type Input = keyof Inputs;

type Action =
  | { type: "inputActivated"; input: Input }
  | { type: "inputDeactivated"; input: Input };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "inputActivated":
      return {
        ...state,
        temp: {
          ...state.temp,
          activeInputs: { ...state.temp.activeInputs, [action.input]: true },
        },
      };
    case "inputDeactivated":
      return {
        ...state,
        temp: {
          ...state.temp,
          activeInputs: { ...state.temp.activeInputs, [action.input]: false },
        },
      };
  }
}

export const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    avatar: {
      absoluteRotation: 0,
      mesh: { position: new Vector3(0, 0, 0) },
    },
    temp: {
      activeInputs: {
        up: false,
        down: false,
        left: false,
        right: false,
      },
    },
  });

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
        <AvatarCamera />
        <hemisphericLight
          name="light1"
          direction={Vector3.Up()}
          intensity={0.7}
        />
        <ground
          name="ground"
          checkCollisions
          height={6}
          width={6}
          position={Vector3.Zero()}
        />
      </Scene>
    </Engine>
  );
};
