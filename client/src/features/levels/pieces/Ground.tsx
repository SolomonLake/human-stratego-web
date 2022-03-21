import { Color3, Vector3 } from "@babylonjs/core";
import { PALATTE } from "../../theme/theme";

export const Ground = ({
  widthX,
  widthZ,
}: {
  widthX: number;
  widthZ: number;
}) => {
  return (
    <ground
      name="ground"
      checkCollisions
      height={widthZ}
      width={widthX}
      position={Vector3.Zero()}
      receiveShadows
    >
      <standardMaterial
        name="groundMaterial"
        diffuseColor={Color3.FromHexString(PALATTE.light)}
      />
    </ground>
  );
};
