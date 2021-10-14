import io from "socket.io-client";

const socket = io(`ws://${window.location.host}`);
const connectedPromise = new Promise<void>((resolve) => {
  socket.on("connect", () => {
    console.log("Connected to server!");
    resolve();
  });
});

const processGameUpdate = (update: any) => {
  console.log("update: ", update);
};

const connect = () =>
  connectedPromise.then(() => {
    socket.on("game_update", processGameUpdate);
  });

connect();

const updateDirection = (keyCode: string) => {
  socket.emit("input", keyCode);
};

console.log("networking loaded");
window.addEventListener("keydown", (ev) => {
  console.log("keydown", ev);
  updateDirection(ev.code);
});
