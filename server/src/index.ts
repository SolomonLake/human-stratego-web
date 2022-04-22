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
  "1": 6,
  "2": 4,
  "3": 3,
  "4": 3,
  "5": 2,
  "6": 0,
  a: 2,
  b: 2,
  c: 2,
  bomb: 3,
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
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "bomb",
    "a",
    "b",
    "c",
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
  let lowestIndex = Math.floor(Math.random() * a.length);
  for (var i = 0; i < a.length; i++) {
    if (a[i] < a[lowestIndex]) lowestIndex = i;
  }
  console.log("Lowest index", lowestIndex);
  return lowestIndex;
}

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {});

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
    const teamIndex = indexOfSmallest(playerCountsForTeams);
    const teamId = teamIds[teamIndex];
    const teamCardIds = Object.keys(teams[teamId].cardCounts);
    const cardId = cardForPlayer(teams[teamId].cardCounts);

    cache.teams[teamId].cardCounts[cardId] -= 1;
    console.log("Team id", teamId);
    cache.players[userId] = {
      position: { x: 0, y: 0, z: 0, yRotation: 0 },
      cardId,
      teamId,
    };
  }

  cache.players[userId].disconnectedAt = undefined;

  socket.broadcast.emit("playerJoined", {
    userId,
    player: cache.players[userId],
  });

  socket.emit("serverCache", cache);

  socket.on("disconnect", (reason) => {
    const disconnectedAt = Date.now();
    cache.players[userId].disconnectedAt = disconnectedAt;
    console.log("disconnected", userId, reason);
    socket.broadcast.emit("playerDisconnected", {
      userId,
      disconnectedAt,
    });
  });

  socket.on("playerMoved", (data) => {
    cache.players[data.userId].position = data.position;
    socket.broadcast.emit("playerMoved", data);
  });
  socket.on("playerCardChanged", (data) => {
    const { cardId: currentCardId, teamId } = cache.players[data.userId];
    if (cache.teams[teamId].cardCounts[data.cardId] > 0) {
      cache.teams[teamId].cardCounts[data.cardId] -= 1;
      cache.teams[teamId].cardCounts[currentCardId] += 1;
      cache.players[data.userId].cardId = data.cardId;

      socket.broadcast.emit("playerCardChanged", data);
    }
  });
  socket.on("playerConfronted", (data) => {
    io.emit("playerConfrontationResolved", {
      defendingUserId: data.defendingUserId,
      attackingUserId: data.attackingUserId,
      defendingUserCardId: cache.players[data.defendingUserId].cardId,
      attackingUserCardId: cache.players[data.attackingUserId].cardId,
    });
  });
});
