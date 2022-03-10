import { Color3, Mesh, Vector3 } from "@babylonjs/core";
import { Engine, Scene } from "react-babylonjs";
import { useEffect, useReducer, useRef } from "react";
import { Avatar } from "./features/avatar/Avatar";
import { ResizeEngine } from "./features/resize/ResizeEngine";
import { Players } from "./features/players/Players";
import { SocketProvider } from "./features/sockets/SocketProvider";
import { SocketContext } from "./features/sockets/SocketContext";
import { io } from "socket.io-client";

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
              direction={new Vector3(0.5, -1, 0)}
              intensity={0.7}
            >
              <shadowGenerator mapSize={1024} />
            </directionalLight>
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
