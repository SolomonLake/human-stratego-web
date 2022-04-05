import { Color3, Vector3 } from "@babylonjs/core";
import { PALATTE } from "../theme/theme";

export const Floor = ({
  widthX,
  widthZ,
  positionX = 0,
  positionZ = 0,
  positionY = 0,
  color3,
}: {
  widthX: number;
  widthZ: number;
  positionX?: number;
  positionZ?: number;
  positionY?: number;
  color3: Color3;
}) => {
  return (
    <ground
      name="ground"
      checkCollisions
      height={widthZ}
      width={widthX}
      position={new Vector3(positionX, positionY, positionZ)}
      receiveShadows
      onCreated={(mesh) => mesh.enableEdgesRendering()}
      edgesWidth={2}
      edgesColor={Color3.FromHexString(PALATTE.accent).toColor4()}
    >
      <standardMaterial name="groundMaterial" diffuseColor={color3} />
    </ground>
  );
};
