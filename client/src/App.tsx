import { useRef } from "react";
import { useArenaScene } from "./features/scenes/useArenaScene";

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

export default App;
