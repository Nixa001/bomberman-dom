import { Player } from "./controllers/player/joueur.js";
import { eventHandler } from "./controllers/player/move.js";
import { readMessageFromServer } from "./controllers/socket/utils.js";
import { initializeWebSocket } from "./controllers/socket/websocket.js";
import { MyFrame } from "./framework/miniframe.js";
import { players, startPos } from "./views/constants.js";
import { gameInfo } from "./views/gameInfo/gameInfo.js";
import { loginInterface } from "./views/login.js";
import { createChatInterface } from "./views/message.js";
import { renderMap } from "./views/playground.js";

let player1 = { id: 1, pseudo: "ibg", x: 1, y: 1, live: 3 };
let player2Pos = { pseudo: "nixa", x: 15, y: 9 };
// let player2Pos = { pseudo: "nixa", x: 15, y: 9 };
// let player2Pos = { pseudo: "nixa", x: 15, y: 1};
// let player2Pos = { pseudo: "nixa", x: 1, y: 9};

document.addEventListener("DOMContentLoaded", () => {
  let infoGame = gameInfo();
  let messageBox = createChatInterface();
  let title = MyFrame.createDomElement("div", { class: "titleDiv" });
  const body = document.querySelector("body");
  MyFrame.appendComponentToNode(loginInterface(), body);
  let data;
  readMessageFromServer((event) => {
    data = JSON.parse(event.data);
    console.log("data :", data);
    console.log("name :", data.name);
    if (data.id == 0) {
      let xP1 = startPos[0].x;
      let yP1 = startPos[0].y;
      console.log("x : y", xP1 + " " + yP1);
      let player1Pos = { pseudo: data.name, x: xP1, y: yP1 };
      let login = document.querySelector(".loginDiv");
      if (login) {
        login.remove();
      }
      MyFrame.appendComponentToNode(messageBox, body);
      
      renderMap();
      players.push(new Player(1, player1Pos.x, player1Pos.y));
      players.push(new Player(2, player2Pos.x, player2Pos.y));
      MyFrame.appendComponentToNode(infoGame, body);
      MyFrame.appendComponentToNode(title, body);
    }
    updateGame();
  });
});

function updateGame() {
  MyFrame.attachEventHandler(document, "keydown", eventHandler);
  requestAnimationFrame(updateGame);
}
initializeWebSocket();
