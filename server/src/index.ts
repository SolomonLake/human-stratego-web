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
  const userId = socket.handshake.auth.userId;
  console.log("Player connected!", socket.id, userId);

  if (!cache.players[userId]) {
    cache.players[userId] = { position: { x: 0, y: 0, z: 0 } };

    socket.broadcast.emit("playerJoin", {
      userId,
      position: cache.players[userId].position,
    });
  }

  cache.players[userId].disconnectedAt = undefined;

  socket.emit("serverCache", cache);

  socket.on("disconnect", (reason) => {
    const disconnectedAt = Date.now();
    cache.players[userId].disconnectedAt = disconnectedAt;
    socket.broadcast.emit("playerDisconnect", {
      userId,
      disconnectedAt,
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
