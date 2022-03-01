import { Vector3 } from "@babylonjs/core";
import { AVATAR_HEIGHT, AVATAR_WIDTH } from "../avatar/Avatar";

export const Players = () => {
  // TODO: get player positions from websocket and update
  return (
    <>
      {[{ position: new Vector3(0, AVATAR_HEIGHT / 2, 4) }].map(
        (player, index) => {
          return (
            <box
              name={`player-${index}`}
              key={index}
              position={player.position}
              height={AVATAR_HEIGHT}
              width={AVATAR_WIDTH}
              depth={AVATAR_WIDTH}
            />
          );
        }
      )}
    </>
  );
};
