import { useLayoutEffect } from "react";
import { useEngine } from "react-babylonjs";

export const ResizeEngine = () => {
  const engine = useEngine();

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

  return <></>;
};
