import { Vector3 } from "@babylonjs/core";
import { Engine, Scene } from "react-babylonjs";
import { Avatar } from "./features/avatar/Avatar";
import { ResizeEngine } from "./features/resize/ResizeEngine";
import { Players } from "./features/players/Players";
import { SocketProvider } from "./features/sockets/SocketProvider";

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
          <>
            <directionalLight
              name="light1"
              direction={new Vector3(1, -1, 0)}
              position={new Vector3(-1000, 1000, 0)}
              intensity={0.5}
            >
              <shadowGenerator mapSize={1024} shadowCasters={["player"]} />
            </directionalLight>
            <hemisphericLight
              name="light2"
              direction={new Vector3(0, -1, 0)}
              intensity={0.5}
            />
            <ground
              name="ground"
              checkCollisions
              height={20}
              width={20}
              position={Vector3.Zero()}
              receiveShadows
            />
            <Avatar />
            <Players />
          </>
        </SocketProvider>
      </Scene>
    </Engine>
  );
};
