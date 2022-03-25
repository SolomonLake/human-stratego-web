import { Color3, Vector3 } from "@babylonjs/core";
import { PALATTE } from "../../theme/theme";

export const Floor = ({
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
    <ground
      name="ground"
      checkCollisions
      height={widthZ}
      width={widthX}
      position={new Vector3(positionX, positionY, positionZ)}
      receiveShadows
    >
      <standardMaterial
        name="groundMaterial"
        diffuseColor={Color3.FromHexString(PALATTE.light)}
      />
    </ground>
  );
};
