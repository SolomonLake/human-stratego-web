import { Color3, Mesh, Vector3 } from "@babylonjs/core";
import { PALATTE } from "../theme/theme";

export const Wall = ({
  width,
  height,
  positionX = 0,
  positionZ = 0,
  positionY = 0,
  rotationY = 0,
  checkCollisions,
  collisionGroup = -1,
  collisionMask = -1,
  color3,
  visibility = 1,
  emissive,
}: {
  width: number;
  height: number;
  positionX?: number;
  positionZ?: number;
  positionY?: number;
  rotationY?: number;
  checkCollisions?: boolean;
  collisionGroup?: number;
  collisionMask?: number;
  color3: Color3;
  visibility?: number;
  emissive?: boolean;
}) => {
  return (
    <plane
      name="wall-plane"
      position={new Vector3(positionX, positionY, positionZ)}
      width={width}
      height={height}
      rotation={new Vector3(0, rotationY, 0)}
      checkCollisions={checkCollisions}
      collisionGroup={collisionGroup}
      collisionMask={collisionMask}
      sideOrientation={Mesh.DOUBLESIDE}
      visibility={visibility}
    >
      <standardMaterial
        name="plane-material"
        diffuseColor={color3}
        emissiveColor={emissive ? color3 : undefined}
      />
    </plane>
  );
};
