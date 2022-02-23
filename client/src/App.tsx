import { useRef } from "react";
import { useArenaScene } from "./features/scenes/useArenaScene";

export let state: State = { count: 0 };

export type State = { count: number };

type Action = { type: "increment" } | { type: "decrement" };

export type AppDispatch = React.Dispatch<Action>;

export const dispatch = (action: Action) => {
  state = reducer(state, action);
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    default:
      throw new Error();
  }
}

export const App = () => {
  const canvasRef = useRef(null);

  useArenaScene(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      id="my-canvas"
      style={{ position: "absolute", height: "100%", width: "100%" }}
    />
  );
};
