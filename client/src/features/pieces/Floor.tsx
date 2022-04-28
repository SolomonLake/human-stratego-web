import { Color3, Vector3 } from "@babylonjs/core";
import { Zone } from "../../zone/zone";
import { PALATTE } from "../theme/theme";

export const FLOOR_MESH_NAME = "floor";

export const Floor = ({
  widthX,
  widthZ,
  positionX = 0,
  positionZ = 0,
  positionY = 0,
  color3,
  zone,
}: {
  widthX: number;
  widthZ: number;
  positionX?: number;
  positionZ?: number;
  positionY?: number;
  color3: Color3;
  zone: Zone;
}) => {
  return (
    <ground
      name={FLOOR_MESH_NAME}
      checkCollisions
      height={widthZ}
      width={widthX}
      position={new Vector3(positionX, positionY, positionZ)}
      receiveShadows
      onCreated={(mesh) => mesh.enableEdgesRendering()}
      edgesWidth={2}
      edgesColor={Color3.FromHexString(PALATTE.light).toColor4()}
      state={zone}
    >
      <standardMaterial name="groundMaterial" diffuseColor={color3} />
    </ground>
  );
};
