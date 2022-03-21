import { Ceiling } from "./pieces/Ceiling";
import { Ground } from "./pieces/Ground";
import { PerimeterWalls } from "./pieces/PerimeterWalls";

export const SquareLevel = () => {
  const widthX = 30;
  const widthZ = 30;
  const height = 3;

  return (
    <>
      <Ground widthX={widthX} widthZ={widthZ} />
      <PerimeterWalls widthX={widthX} widthZ={widthZ} height={height} />
      <Ceiling widthX={widthX} widthZ={widthZ} height={height} />
    </>
  );
};
