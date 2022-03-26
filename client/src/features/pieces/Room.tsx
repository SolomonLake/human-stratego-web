import { Color3, Vector3 } from "@babylonjs/core";
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
  collisionGroup,
  collisionMask,
  invertWalls,
  color3,
}: {
  size: Vector3;
  position: Vector3;
  positiveXWall?: boolean;
  negativeXWall?: boolean;
  positiveZWall?: boolean;
  negativeZWall?: boolean;
  checkCollisions?: boolean;
  collisionGroup?: number;
  collisionMask?: number;
  invertWalls?: boolean;
  color3: Color3;
}) => {
  return (
    <transformNode name="room-transform-node" position={position}>
      <Floor
        widthX={size.x}
        widthZ={size.z}
        positionY={-1 * (size.y / 2)}
        color3={color3}
      />
      <Ceiling widthX={size.x} widthZ={size.z} positionY={size.y / 2} />
      {positiveXWall && (
        <Wall
          positionX={size.x / 2}
          rotationY={Math.PI * (invertWalls ? 1.5 : 0.5)}
          height={size.y}
          width={size.z}
          checkCollisions={checkCollisions}
          collisionGroup={collisionGroup}
          collisionMask={collisionMask}
          color3={color3}
        />
      )}
      {negativeXWall && (
        <Wall
          positionX={-1 * (size.x / 2)}
          rotationY={Math.PI * (invertWalls ? 0.5 : 1.5)}
          height={size.y}
          width={size.z}
          checkCollisions={checkCollisions}
          collisionGroup={collisionGroup}
          collisionMask={collisionMask}
          color3={color3}
        />
      )}
      {positiveZWall && (
        <Wall
          positionZ={size.z / 2}
          rotationY={Math.PI * (invertWalls ? 1 : 0)}
          height={size.y}
          width={size.x}
          checkCollisions={checkCollisions}
          collisionGroup={collisionGroup}
          collisionMask={collisionMask}
          color3={color3}
        />
      )}
      {negativeZWall && (
        <Wall
          positionZ={-1 * (size.z / 2)}
          rotationY={Math.PI * (invertWalls ? 0 : 1)}
          height={size.y}
          width={size.x}
          checkCollisions={checkCollisions}
          collisionGroup={collisionGroup}
          collisionMask={collisionMask}
          color3={color3}
        />
      )}
    </transformNode>
  );
};
