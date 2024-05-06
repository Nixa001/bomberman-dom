import { Player } from "./controllers/player/joueur.js";
import { eventHandler } from "./controllers/player/move.js";
import { MyFrame } from "./framework/miniframe.js";
import { players } from "./views/constants.js";
import { loginInterface } from "./views/login.js";
import { createChatInterface } from "./views/message.js";
import { renderMap } from "./views/playground.js";

let player1Pos = { pseudo: "ibg", x: 1, y: 1 };
// let player2Pos = { pseudo: "nixa", x: 13, y: 7 };

document.addEventListener("DOMContentLoaded", () => {
  let messageBox = createChatInterface();
  let title = MyFrame.createDomElement("div", { class: "titleDiv" });
  const body = document.querySelector("body");

  // MyFrame.appendComponentToNode( loginInterface(), body);
  MyFrame.appendComponentToNode(title, body);
  renderMap();
  players.push(new Player(1, player1Pos.x, player1Pos.y));
  MyFrame.appendComponentToNode(messageBox, body);
  updateGame();
});

function updateGame() {
  MyFrame.attachEventHandler(document, "keydown", eventHandler);

  requestAnimationFrame(updateGame);
}
