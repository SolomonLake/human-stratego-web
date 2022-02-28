import { Color3, Mesh, Vector3 } from "@babylonjs/core";
import { Engine, Scene } from "react-babylonjs";
import { useEffect, useReducer, useRef } from "react";
import { AvatarCamera } from "./features/avatar/AvatarCamera";
import { ResizeEngine } from "./features/resize/ResizeEngine";
import { Avatar } from "./features/avatar/Avatar";

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

export const AVATAR_HEIGHT = 0.3;

const CAMERA_DISTANCE = 1.5;

export const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    avatar: {
      absoluteRotation: 0,
      mesh: { position: new Vector3(0, AVATAR_HEIGHT / 2, 0) },
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

  useEffect(() => {
    const keyToInputMap: { [key: string]: Input } = {
      w: "up",
      s: "down",
      a: "left",
      d: "right",
    };
    const onKeydown = (event: KeyboardEvent) => {
      const input = keyToInputMap[event.key];
      if (input) {
        dispatch({ type: "inputActivated", input });
      }
    };
    window.addEventListener("keydown", onKeydown);
    const onKeyup = (event: KeyboardEvent) => {
      const input = keyToInputMap[event.key];
      if (input) {
        dispatch({ type: "inputDeactivated", input });
      }
    };
    window.addEventListener("keyup", onKeyup);
    return () => {
      window.removeEventListener("keydown", onKeydown);
      window.removeEventListener("keyup", onKeyup);
    };
  });

  const avatarRef = useRef<Mesh | null>(null);

  return (
    <Engine
      adaptToDeviceRatio={false}
      antialias
      engineOptions={undefined}
      canvasId="babylon-canvas"
    >
      <ResizeEngine />
      <Scene key="arena-scene">
        <AvatarCamera avatarRef={avatarRef} />
        <hemisphericLight
          name="light1"
          direction={Vector3.Up()}
          intensity={0.7}
        />
        <ground name="ground" height={6} width={6} position={Vector3.Zero()} />
        <Avatar avatarRef={avatarRef} activeInputs={state.temp.activeInputs} />
      </Scene>
    </Engine>
  );
};
