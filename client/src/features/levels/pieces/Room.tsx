import { Vector3 } from "@babylonjs/core";
import { Ceiling } from "./Ceiling";
import { Floor } from "./Floor";
import { Wall } from "./Wall";

export const Room = ({
  size,
  position,
  positiveXWall,
  negativeXWall,
  positiveZWall,
  negativeZWall,
  checkCollisions,
}: {
  size: Vector3;
  position: Vector3;
  positiveXWall?: boolean;
  negativeXWall?: boolean;
  positiveZWall?: boolean;
  negativeZWall?: boolean;
  checkCollisions?: boolean;
}) => {
  return (
    <transformNode name="room-transform-node" position={position}>
      <Floor widthX={size.x} widthZ={size.z} positionY={-1 * (size.y / 2)} />
      <Ceiling widthX={size.x} widthZ={size.z} positionY={size.y / 2} />
      {positiveXWall && (
        <Wall
          positionX={size.x / 2}
          rotationY={Math.PI * 0.5}
          height={size.y}
          width={size.z}
          checkCollisions={checkCollisions}
        />
      )}
      {negativeXWall && (
        <Wall
          positionX={-1 * (size.x / 2)}
          rotationY={Math.PI * 1.5}
          height={size.y}
          width={size.z}
          checkCollisions={checkCollisions}
        />
      )}
      {positiveZWall && (
        <Wall
          positionZ={size.z / 2}
          rotationY={Math.PI * 0}
          height={size.y}
          width={size.x}
          checkCollisions={checkCollisions}
        />
      )}
      {negativeZWall && (
        <Wall
          positionZ={-1 * (size.z / 2)}
          rotationY={Math.PI * 1}
          height={size.y}
          width={size.x}
          checkCollisions={checkCollisions}
        />
      )}
    </transformNode>
  );
};
