import { Color3, TransformNode, Vector3 } from "@babylonjs/core";
import { BabylonNode } from "react-babylonjs";
import { Zone } from "../../zone/zone";
import { Ceiling } from "./Ceiling";
import { Floor } from "./Floor";
import { Wall } from "./Wall";

export const Room = ({
  children,
  size,
  position,
  positiveXWall,
  positiveXWallVisibility,
  positiveXWallCollisionGroup,
  positiveXWallColor3,
  negativeXWall,
  negativeXWallVisibility,
  negativeXWallCollisionGroup,
  negativeXWallColor3,
  positiveZWall,
  positiveZWallVisibility,
  positiveZWallCollisionGroup,
  positiveZWallColor3,
  negativeZWall,
  negativeZWallVisibility,
  negativeZWallCollisionGroup,
  negativeZWallColor3,
  checkCollisions,
  collisionGroup,
  collisionMask,
  invertWalls,
  color3,
  wallVisibility,
  emissiveWalls,
  zone,
}: BabylonNode<TransformNode> & {
  size: Vector3;
  position: Vector3;
  positiveXWall?: boolean;
  positiveXWallVisibility?: number;
  positiveXWallCollisionGroup?: number;
  positiveXWallColor3?: Color3;
  negativeXWall?: boolean;
  negativeXWallVisibility?: number;
  negativeXWallCollisionGroup?: number;
  negativeXWallColor3?: Color3;
  positiveZWall?: boolean;
  positiveZWallVisibility?: number;
  positiveZWallCollisionGroup?: number;
  positiveZWallColor3?: Color3;
  negativeZWall?: boolean;
  negativeZWallVisibility?: number;
  negativeZWallCollisionGroup?: number;
  negativeZWallColor3?: Color3;
  checkCollisions?: boolean;
  collisionGroup?: number;
  collisionMask?: number;
  invertWalls?: boolean;
  color3: Color3;
  wallVisibility?: number;
  emissiveWalls?: boolean;
  zone: Zone;
}) => {
  return (
    <transformNode name="room-transform-node" position={position}>
      {children}
      <Floor
        widthX={size.x}
        widthZ={size.z}
        positionY={-1 * (size.y / 2)}
        color3={color3}
        zone={zone}
      />
      <Ceiling
        widthX={size.x}
        widthZ={size.z}
        positionY={size.y / 2}
        color3={color3}
      />
      {positiveXWall && (
        <Wall
          positionX={size.x / 2}
          rotationY={Math.PI * (invertWalls ? 1.5 : 0.5)}
          height={size.y}
          width={size.z}
          checkCollisions={checkCollisions}
          collisionGroup={
            typeof positiveXWallCollisionGroup === "number"
              ? positiveXWallCollisionGroup
              : collisionGroup
          }
          collisionMask={collisionMask}
          color3={positiveXWallColor3 ? positiveXWallColor3 : color3}
          visibility={
            typeof positiveXWallVisibility === "number"
              ? positiveXWallVisibility
              : wallVisibility
          }
          emissive={emissiveWalls}
        />
      )}
      {negativeXWall && (
        <Wall
          positionX={-1 * (size.x / 2)}
          rotationY={Math.PI * (invertWalls ? 0.5 : 1.5)}
          height={size.y}
          width={size.z}
          checkCollisions={checkCollisions}
          collisionGroup={
            typeof negativeXWallCollisionGroup === "number"
              ? negativeXWallCollisionGroup
              : collisionGroup
          }
          collisionMask={collisionMask}
          color3={negativeXWallColor3 ? negativeXWallColor3 : color3}
          visibility={
            typeof negativeXWallVisibility === "number"
              ? negativeXWallVisibility
              : wallVisibility
          }
          emissive={emissiveWalls}
        />
      )}
      {positiveZWall && (
        <Wall
          positionZ={size.z / 2}
          rotationY={Math.PI * (invertWalls ? 1 : 0)}
          height={size.y}
          width={size.x}
          checkCollisions={checkCollisions}
          collisionGroup={
            typeof positiveZWallCollisionGroup === "number"
              ? positiveZWallCollisionGroup
              : collisionGroup
          }
          collisionMask={collisionMask}
          color3={positiveZWallColor3 ? positiveZWallColor3 : color3}
          visibility={
            typeof positiveZWallVisibility === "number"
              ? positiveZWallVisibility
              : wallVisibility
          }
          emissive={emissiveWalls}
        />
      )}
      {negativeZWall && (
        <Wall
          positionZ={-1 * (size.z / 2)}
          rotationY={Math.PI * (invertWalls ? 0 : 1)}
          height={size.y}
          width={size.x}
          checkCollisions={checkCollisions}
          collisionGroup={
            typeof negativeZWallCollisionGroup === "number"
              ? negativeZWallCollisionGroup
              : collisionGroup
          }
          collisionMask={collisionMask}
          color3={negativeZWallColor3 ? negativeZWallColor3 : color3}
          visibility={
            typeof negativeZWallVisibility === "number"
              ? negativeZWallVisibility
              : wallVisibility
          }
          emissive={emissiveWalls}
        />
      )}
    </transformNode>
  );
};
