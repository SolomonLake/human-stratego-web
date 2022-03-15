import { Color3, Vector3 } from "@babylonjs/core";
import { Engine, Scene } from "react-babylonjs";
import { Avatar } from "./features/avatar/Avatar";
import { ResizeEngine } from "./features/resize/ResizeEngine";
import { Players } from "./features/players/Players";
import { SocketProvider } from "./features/sockets/SocketProvider";
import { PALATTE } from "./features/theme/theme";

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
              intensity={0.2}
            >
              <shadowGenerator mapSize={1024} shadowCasters={["player"]} />
            </directionalLight>
            <hemisphericLight
              name="light2"
              direction={new Vector3(0, 1, 0)}
              intensity={0.25}
            />
            <ground
              name="ground"
              checkCollisions
              height={20}
              width={20}
              position={Vector3.Zero()}
              receiveShadows
            >
              <standardMaterial
                name="groundMaterial"
                diffuseColor={Color3.FromHexString(PALATTE.light)}
              />
            </ground>
            <plane
              name="negative-x-plane"
              position-x={-10}
              position-y={2.5}
              width={20}
              height={5}
              sideOrientation={1}
              rotation={new Vector3(0, Math.PI * 0.5, 0)}
              checkCollisions
            />
            <plane
              name="positive-x-plane"
              position-x={10}
              position-y={2.5}
              width={20}
              height={5}
              sideOrientation={1}
              rotation={new Vector3(0, Math.PI * 1.5, 0)}
              checkCollisions
            />
            <plane
              name="positive-z-plane"
              position-z={10}
              position-y={2.5}
              width={20}
              height={5}
              sideOrientation={1}
              rotation={new Vector3(0, Math.PI * 1, 0)}
              checkCollisions
            />
            <plane
              name="negative-z-plane"
              position-z={-10}
              position-y={2.5}
              width={20}
              height={5}
              sideOrientation={1}
              rotation={new Vector3(0, Math.PI * 0, 0)}
              checkCollisions
            >
              <standardMaterial
                name="plane-material"
                diffuseColor={Color3.FromHexString(PALATTE.light)}
              />
            </plane>
            <plane
              name="positive-y-plane"
              position-y={5}
              width={20}
              height={20}
              sideOrientation={1}
              rotation={new Vector3(Math.PI * 0.5, 0, 0)}
              checkCollisions
            >
              <standardMaterial
                name="plane-material"
                diffuseColor={Color3.FromHexString(PALATTE.light)}
              />
            </plane>
            <Avatar />
            <Players />
          </>
        </SocketProvider>
      </Scene>
    </Engine>
  );
};
