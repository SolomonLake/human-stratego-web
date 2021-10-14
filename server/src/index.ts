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

const io = new Server(server);

io.on("connection", (socket: Socket) => {
  console.log("Player connected!", socket.id);

  socket.on("join_game", (username: string) => {
    console.log("join game: ", username);
  });
  socket.on("input", (keyCode) => {
    console.log("input: ", keyCode);
  });
  socket.on("disconnect", () => {
    console.log("disconnect");
  });

  socket.emit("game_update", { ms: Date.now() });

  setInterval(() => {
    console.log("interval!");
    socket.emit("game_update", { ms: Date.now() });
  }, 1000);
});
