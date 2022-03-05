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

const cache: ServerCache = {
  players: {},
};

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server);

io.on("connection", (socket) => {
  console.log("Player connected!", socket.id, socket.handshake.auth.userId);
  socket.emit("serverCache", cache);

  // socket.on("join_game", (username: string) => {
  //   console.log("join game: ", username);
  // });
  socket.on("disconnect", (reason) => {
    delete cache.players[socket.handshake.auth.userId];
    socket.broadcast.emit("playerDisconnect", {
      userId: socket.handshake.auth.userId,
    });
  });
  socket.on(
    "playerMove",
    (data: {
      userId: string;
      position: { x: number; y: number; z: number };
    }) => {
      if (!cache.players[data.userId]) {
        cache.players[data.userId] = { position: data.position };
      }
      cache.players[data.userId].position = data.position;
      socket.broadcast.emit("playerMove", data);
    }
  );
});
