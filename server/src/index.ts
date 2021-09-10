import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "../../client/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

app.get("/api/hey", (req, res) => res.send({ message: "ho!" }));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Hello world listening on port", port);
});
