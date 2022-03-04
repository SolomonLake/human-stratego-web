import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { Server, Socket } from "socket.io";

const app = express();

app.use(express.static(path.join(__dirname, "../../client/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

app.get("/api/hey", (req, res) => res.send({ message: "ho!" }));

const port = process.env.PORT || 8080;
const server = app.listen(port);

enum ServerToClientEvent {
  noArg,
  basicEmit,
  withAck,
}

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server);

io.on("connection", (socket) => {
  console.log("Player connected!", socket.id, socket.handshake.auth.userId);

  socket.on("join_game", (username: string) => {
    console.log("join game: ", username);
  });
  socket.on("disconnect", (reason) => {
    socket.broadcast.emit("player_disconnect", {
      userId: socket.handshake.auth.userId,
    });
  });
  socket.on(
    "player_move",
    (data: {
      userId: string;
      position: { x: number; y: number; z: number };
    }) => {
      console.log("userId", data.userId);
      console.log("position", data.position);
      socket.broadcast.emit("player_move", data);
      socket.emit("withAck", "4", (ev) => {
        var a = ev;
      });
    }
  );
});
