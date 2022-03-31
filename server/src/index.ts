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

const initialCardCounts = {
  bomb: 2,
  scout: 6,
  diffuser: 0,
  footpad: 0,
  thief: 0,
  agent: 0,
  spy: 0,
  mastermind: 0,
  assassin: 0,
  battlemaster: 0,
  councillor: 0,
};

const cache: ServerCache = {
  players: {},
  teams: {
    "1": {
      color: "team1",
      side: 1,
      cardCounts: initialCardCounts,
    },
    "2": { color: "team2", side: -1, cardCounts: initialCardCounts },
  },
};

function cardForPlayer(cardCounts: CardCounts): CardId {
  const orderToGive: CardId[] = [
    "scout",
    "diffuser",
    "footpad",
    "thief",
    "agent",
    "spy",
    "mastermind",
    "bomb",
    "assassin",
    "battlemaster",
    "councillor",
  ];
  for (let i = 0; i < orderToGive.length; i++) {
    const cardId = orderToGive[i];
    if (cardCounts[cardId] > 0) {
      return cardId;
    }
  }
  // TODO: handle no cards left in team
  throw new Error("No cards to give");
}

function indexOfSmallest(a: any[]) {
  let lowest = a[Math.floor(Math.random() * a.length)];
  for (var i = 0; i < a.length; i++) {
    if (a[i] < a[lowest]) lowest = i;
  }
  return lowest;
}

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server);

io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId;
  console.log("Player connected!", socket.id, userId);

  if (!cache.players[userId]) {
    const { teams, players } = cache;
    const teamIds = Object.keys(cache.teams) as TeamId[];
    const playerCountsForTeams = teamIds.map(
      (teamId) =>
        Object.values(players).filter((player) => player.teamId === teamId)
          .length
    );
    const teamId = teamIds[indexOfSmallest(playerCountsForTeams)];
    const teamCardIds = Object.keys(teams[teamId].cardCounts);
    const cardId = cardForPlayer(teams[teamId].cardCounts);
    console.log("Team id", teamId);
    cache.players[userId] = {
      position: { x: 0, y: 0, z: 0, yRotation: 0 },
      cardId,
      teamId,
    };

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
    (data: { userId: string; position: PlayerPosition }) => {
      if (!cache.players[data.userId]) {
        cache.players[data.userId] = {
          ...cache.players[data.userId],
          position: data.position,
        };
      }
      cache.players[data.userId].position = data.position;
      socket.broadcast.emit("playerMove", data);
    }
  );
});
