import { Color3, Vector3 } from "@babylonjs/core";
import { PALATTE } from "../../theme/theme";

export const Ceiling = ({
  widthX,
  widthZ,
  height,
}: {
  widthX: number;
  widthZ: number;
  height: number;
}) => {
  return (
    <plane
      name="positive-y-plane"
      position-y={height}
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
