import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./networking";

fetch("/api/hey").then(async (response) => {
  console.log(await response.json());
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
