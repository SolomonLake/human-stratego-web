import { Vector3 } from "@babylonjs/core";
import { Ceiling } from "./pieces/Ceiling";
import { Floor } from "./pieces/Floor";
import { Room } from "./pieces/Room";

export const SquareLevel = () => {
  const widthX = 30;
  const widthZ = 30;
  const height = 3;

  return (
    <>
      <Room
        size={new Vector3(widthX / 2, height, widthZ)}
        position={new Vector3(-1 * (widthX / 2 / 2), height / 2, 0)}
        negativeXWall
        positiveZWall
        negativeZWall
      />
      <Room
        size={new Vector3(widthX / 2, height, widthZ)}
        position={new Vector3(widthX / 2 / 2, height / 2, 0)}
        positiveXWall
        positiveZWall
        negativeZWall
      />
    </>
  );
};
