import { Color3, Vector3 } from "@babylonjs/core";

const SIZE = 2;

export const PositionalArrows = ({
  position = Vector3.Zero(),
}: {
  position?: Vector3;
}) => {
  return (
    <transformNode position={position} name="transform-node">
      <lines
        name="red-line-x"
        points={[
          Vector3.Zero(),
          new Vector3(SIZE, 0, 0),
          new Vector3(SIZE * 0.95, 0.05 * SIZE, 0),
          new Vector3(SIZE, 0, 0),
          new Vector3(SIZE * 0.95, -0.05 * SIZE, 0),
        ]}
        color={new Color3(1, 0, 0)}
      />
      <lines
        name="green-line-y"
        points={[
          Vector3.Zero(),
          new Vector3(0, SIZE, 0),
          new Vector3(-0.05 * SIZE, SIZE * 0.95, 0),
          new Vector3(0, SIZE, 0),
          new Vector3(0.05 * SIZE, SIZE * 0.95, 0),
        ]}
        color={new Color3(0, 1, 0)}
      />
      <lines
        name="blue-line-z"
        points={[
          Vector3.Zero(),
          new Vector3(0, 0, SIZE),
          new Vector3(0, -0.05 * SIZE, SIZE * 0.95),
          new Vector3(0, 0, SIZE),
          new Vector3(0, 0.05 * SIZE, SIZE * 0.95),
        ]}
        color={new Color3(0, 0, 1)}
      />
    </transformNode>
  );
};
