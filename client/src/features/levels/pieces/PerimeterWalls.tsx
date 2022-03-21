import { Color3, Vector3 } from "@babylonjs/core";
import { PALATTE } from "../../theme/theme";

export const PerimeterWalls = ({
  widthX,
  widthZ,
  height,
}: {
  widthX: number;
  widthZ: number;
  height: number;
}) => {
  return (
    <>
      <plane
        name="negative-x-plane"
        position-x={-1 * (widthX / 2)}
        position-y={height / 2}
        width={widthX}
        height={height}
        sideOrientation={1}
        rotation={new Vector3(0, Math.PI * 0.5, 0)}
        checkCollisions
      />
      <plane
        name="positive-x-plane"
        position-x={widthX / 2}
        position-y={height / 2}
        width={widthX}
        height={height}
        sideOrientation={1}
        rotation={new Vector3(0, Math.PI * 1.5, 0)}
        checkCollisions
      />
      <plane
        name="positive-z-plane"
        position-z={widthZ / 2}
        position-y={height / 2}
        width={widthZ}
        height={height}
        sideOrientation={1}
        rotation={new Vector3(0, Math.PI * 1, 0)}
        checkCollisions
      />
      <plane
        name="negative-z-plane"
        position-z={-1 * (widthZ / 2)}
        position-y={height / 2}
        width={widthZ}
        height={height}
        sideOrientation={1}
        rotation={new Vector3(0, Math.PI * 0, 0)}
        checkCollisions
      >
        <standardMaterial
          name="plane-material"
          diffuseColor={Color3.FromHexString(PALATTE.light)}
        />
      </plane>
    </>
  );
};
