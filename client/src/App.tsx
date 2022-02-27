import { Color3, Mesh, Vector3 } from "@babylonjs/core";
import { Engine, Scene, useEngine } from "react-babylonjs";
import { useLayoutEffect, useRef } from "react";
import { AvatarCamera } from "./features/avatar/AvatarCamera";

export let state: State = {
  count: 0,
  avatar: null,
  temp: {
    activeInputs: {
      forward: false,
      backward: false,
      left: false,
      right: false,
    },
  },
};

export type State = {
  count: number;
  avatar: { absoluteRotation: number; mesh: { position: Vector3 } } | null;
  temp: {
    activeInputs: {
      forward: boolean;
      backward: boolean;
      left: boolean;
      right: boolean;
    };
  };
};
type Input = keyof State["temp"]["activeInputs"];

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "inputActivated"; input: Input }
  | { type: "inputDeactivated"; input: Input };

export type AppDispatch = React.Dispatch<Action>;

export const appDispatch = (action: Action) => {
  state = reducer(state, action);
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
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

const ABSOLUTE_ROTATION = 0;
export const AVATAR_HEIGHT = 0.3;
const MESH = null;
const ROTATION_SPEED = 0.01;
const WALK_SPEED = 0.007;

const CAMERA_DISTANCE = 1.5;

export const App = () => {
  const engine = useEngine();

  // useEffect(() => {
  //   const keyToInputMap: { [key: string]: Input } = {
  //     w: "forward",
  //     s: "backward",
  //     a: "left",
  //     d: "right",
  //   };
  //   const onKeydown = (event: KeyboardEvent) => {
  //     const input = keyToInputMap[event.key];
  //     if (input) {
  //       appDispatch({ type: "inputActivated", input });
  //     }
  //   };
  //   window.addEventListener("keydown", onKeydown);
  //   const onKeyup = (event: KeyboardEvent) => {
  //     const input = keyToInputMap[event.key];
  //     if (input) {
  //       appDispatch({ type: "inputDeactivated", input });
  //     }
  //   };
  //   window.addEventListener("keyup", onKeyup);
  //   return () => {
  //     window.removeEventListener("keydown", onKeydown);
  //     window.removeEventListener("keyup", onKeyup);
  //   };
  // });

  useLayoutEffect(() => {
    const onResize = () => {
      if (engine) {
        engine.resize();
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [engine]);

  const avatarRef = useRef<Mesh | null>(null);

  return (
    <Engine
      adaptToDeviceRatio={false}
      antialias
      engineOptions={undefined}
      canvasId="babylon-canvas"
    >
      <Scene key="arena-scene">
        <AvatarCamera avatarRef={avatarRef} />
        <hemisphericLight
          name="light1"
          direction={Vector3.Up()}
          intensity={0.7}
        />
        <ground name="ground" height={6} width={6} position={Vector3.Zero()} />
        <box
          name="avatar"
          ref={avatarRef}
          height={AVATAR_HEIGHT}
          width={0.1}
          depth={0.1}
          position={new Vector3(0, AVATAR_HEIGHT / 2, 0)}
        >
          <standardMaterial name="matAvatar" diffuseColor={Color3.Green()} />
        </box>
      </Scene>
    </Engine>
  );
};
