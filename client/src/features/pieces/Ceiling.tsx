import { Color3, Vector3 } from "@babylonjs/core";
import { PALATTE } from "../theme/theme";

export const Ceiling = ({
  widthX,
  widthZ,
  positionX = 0,
  positionZ = 0,
  positionY = 0,
}: {
  widthX: number;
  widthZ: number;
  positionX?: number;
  positionZ?: number;
  positionY?: number;
}) => {
  return (
    <plane
      name="positive-y-plane"
      position={new Vector3(positionX, positionY, positionZ)}
      width={widthX}
      height={widthZ}
      sideOrientation={1}
      rotation={new Vector3(Math.PI * 0.5, 0, 0)}
      checkCollisions
    >
      <standardMaterial
        name="plane-material"
        diffuseColor={Color3.FromHexString(PALATTE.light)}
      />
    </plane>
  );
};
