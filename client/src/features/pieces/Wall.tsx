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
}: {
  width: number;
  height: number;
  positionX?: number;
  positionZ?: number;
  positionY?: number;
  rotationY?: number;
  checkCollisions?: boolean;
}) => {
  return (
    <plane
      name="wall-plane"
      position={new Vector3(positionX, positionY, positionZ)}
      width={width}
      height={height}
      rotation={new Vector3(0, rotationY, 0)}
      checkCollisions={checkCollisions}
    >
      <standardMaterial
        name="plane-material"
        diffuseColor={Color3.FromHexString(PALATTE.light)}
      />
    </plane>
  );
};
