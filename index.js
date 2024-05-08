import { Player } from "./controllers/player/joueur.js";
import { eventHandler } from "./controllers/player/move.js";
import { MyFrame } from "./framework/miniframe.js";
import { players } from "./views/constants.js";
import { loginInterface } from "./views/login.js";
import { createChatInterface } from "./views/message.js";
import { renderMap } from "./views/playground.js";

let player1 = { id: 1, pseudo: "ibg", x: 1, y: 1, live: 3 };
// let player2Pos = { pseudo: "nixa", x: 13, y: 7 };

document.addEventListener("DOMContentLoaded", () => {
  let messageBox = createChatInterface();
  let title = MyFrame.createDomElement("div", { class: "titleDiv" });
  const body = document.querySelector("body");

  // MyFrame.appendComponentToNode( loginInterface(), body);
  MyFrame.appendComponentToNode(title, body);
  renderMap();
  players.push(new Player(1, player1.x, player1.y));
  MyFrame.appendComponentToNode(messageBox, body);
  updateGame();
});

function updateGame() {
  // renderMap();
  MyFrame.attachEventHandler(document, "keydown", eventHandler);
  // players.forEach((player) => {
  //   cellToExplode.forEach((bomb) => {
  //     const bombPosition = {
  //       x: parseInt(bomb.style.left) / CELL_SIZE,
  //       y: parseInt(bomb.style.top) / CELL_SIZE,
  //     };
  //     if (player.x === bombPosition.x && player.y === bombPosition.y) {
  //       console.log("Explose");
  //       player.lives--;
  //       if (player.lives <= 0) {
  //         alert("Vous avez perdu !");
  //       }
  //     }
  //   });
  // });

  requestAnimationFrame(updateGame);
}
