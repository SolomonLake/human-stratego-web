import { Engine, Vector3 } from "@babylonjs/core";
import { useEffect, useRef, useState } from "react";
import { useArenaScene } from "./features/scenes/useArenaScene";

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

const ANTIALIAS = true;
const ENGINE_OPTIONS = undefined;
const ADAPT_TO_DEVICE_RATIO = false;

export const App = () => {
  const canvasRef = useRef(null);

  const [engine, setEngine] = useState<Engine | null>(null);

  useEffect(() => {
    if (!engine) {
      setEngine(
        new Engine(
          canvasRef.current,
          ANTIALIAS,
          ENGINE_OPTIONS,
          ADAPT_TO_DEVICE_RATIO
        )
      );
    }

    const onResize = () => {
      if (engine) {
        engine.resize();
      }
    };
    window.addEventListener("resize", onResize);

    const keyToInputMap: { [key: string]: Input } = {
      w: "forward",
      s: "backward",
      a: "left",
      d: "right",
    };
    const onKeydown = (event: KeyboardEvent) => {
      const input = keyToInputMap[event.key];
      if (input) {
        appDispatch({ type: "inputActivated", input });
      }
    };
    window.addEventListener("keydown", onKeydown);
    const onKeyup = (event: KeyboardEvent) => {
      const input = keyToInputMap[event.key];
      if (input) {
        appDispatch({ type: "inputDeactivated", input });
      }
    };
    window.addEventListener("keyup", onKeyup);

    return () => {
      if (engine) {
        engine.dispose();
      }

      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeydown);
      window.removeEventListener("keyup", onKeyup);
    };
  }, [canvasRef, ANTIALIAS, ENGINE_OPTIONS, ADAPT_TO_DEVICE_RATIO]);

  useArenaScene(engine);

  return (
    <canvas
      ref={canvasRef}
      id="my-canvas"
      style={{ position: "absolute", height: "100%", width: "100%" }}
    />
  );
};
