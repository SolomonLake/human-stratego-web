import { Vector3 } from "@babylonjs/core";
import io from "socket.io-client";

const socket = io(`ws://${window.location.host}`);
const connectedPromise = new Promise<void>((resolve) => {
  socket.on("connect", () => {
    console.log("Connected to server!");
    resolve();
  });
});

const processGameUpdate = (update: any) => {
  // console.log("update: ", update);
};

const connect = () =>
  connectedPromise.then(() => {
    socket.on("game_update", processGameUpdate);
  });

connect();

export const updateAvatarPosition = ({ position }: { position: Vector3 }) => {
  socket.emit("player_move", {
    userId: "hello",
    position: { x: position.x, y: position.y, z: position.z },
  });
};

const updateDirection = (keyCode: string) => {
  socket.emit("input", keyCode);
};

window.addEventListener("keydown", (ev) => {
  updateDirection(ev.code);
});
