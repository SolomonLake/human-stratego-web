import { Color3, Vector3 } from "@babylonjs/core";
import { Engine, Scene } from "react-babylonjs";
import { Avatar } from "./features/avatar/Avatar";
import { ResizeEngine } from "./features/resize/ResizeEngine";
import { Players } from "./features/players/Players";
import { SocketProvider } from "./features/sockets/SocketProvider";
import { PALATTE } from "./features/theme/theme";
import { Ceiling } from "./features/pieces/Ceiling";
import { Floor } from "./features/pieces/Floor";
import { PositionalArrows } from "./dev/positionalArrows/PositionalArrows";
import { SquareLevel } from "./features/levels/square/SquareLevel";
import { CacheProvider } from "./features/cache/CacheProvider";
import { Control } from "@babylonjs/gui";
import { PLAYER_MESH_NAME } from "./features/players/Player";
import { FLAG_MESH_NAME } from "./features/levels/square/SquareTeamSide";

export const App = () => {
  const framesPerSecond = 60;
  const gravity = -9.81;

  return (
    <Engine
      adaptToDeviceRatio={false}
      antialias
      engineOptions={undefined}
      canvasId="babylon-canvas"
    >
      <ResizeEngine />
      <Scene
        key="arena-scene"
        gravity-y={gravity / framesPerSecond}
        collisionsEnabled
      >
        <SocketProvider>
          <CacheProvider>
            {/* <PositionalArrows /> */}
            <directionalLight
              name="light1"
              direction={new Vector3(1, -1, 0.5)}
              position={new Vector3(-1000, 1000, -1000)}
              intensity={0.25}
            >
              <shadowGenerator
                mapSize={1024}
                shadowCasters={[PLAYER_MESH_NAME, FLAG_MESH_NAME]}
              />
            </directionalLight>
            <hemisphericLight
              name="light2"
              direction={new Vector3(0, 1, 0)}
              intensity={0.25}
            />
            <SquareLevel />
            <Avatar />
            <Players />
          </CacheProvider>
        </SocketProvider>
      </Scene>
    </Engine>
  );
};
