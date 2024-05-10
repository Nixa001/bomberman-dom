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
import { Waiting } from "./views/waiting.js";

// let player1 = { id: 1, pseudo: "ibg", x: 1, y: 1, live: 3 };
// let player2Pos = { pseudo: "nixa", x: 15, y: 9 };
// let player2Pos = { pseudo: "nixa", x: 15, y: 9 };
// let player2Pos = { pseudo: "nixa", x: 15, y: 1};
// let player2Pos = { pseudo: "nixa", x: 1, y: 9};

const users = [
  { name: "Player1", username: "ibg" },
  { name: "Player2", username: "nixa" },
  { name: "Player3", username: "dicks" },
  { name: "Player4", username: "darze" },
];
document.addEventListener("DOMContentLoaded", () => {
  let infoGame = gameInfo();
  let messageBox = createChatInterface();
  let title = MyFrame.createDomElement("div", { class: "titleDiv" });
  const body = document.querySelector("body");
  MyFrame.appendComponentToNode(loginInterface(), body);
  let data;
  readMessageFromServer((event) => {
    data = JSON.parse(event.data);
    if (data && data.state == "join") {
      let login = document.querySelector(".loginDiv");
      login.remove();
      renderMap();

      data.players.forEach((player) => {
        const id = player.id;
        let xPlayer = startPos[id].x;
        let yPlayer = startPos[id].y;
        let playerPos = {
          id: id,
          pseudo: player.pseudo,
          x: xPlayer,
          y: yPlayer,
        };
        players.push(
          new Player(playerPos.id, playerPos.pseudo, playerPos.x, playerPos.y)
        );
        if (id == data.dataResp.id) {
          MyFrame.attachEventHandler(document, "keydown", (event) => {
            eventHandler(event, id);
          });
        }
      });
    }
    // console.log("x : y", xP1 + " " + yP1);
    // MyFrame.appendComponentToNode(messageBox, body);
    // players.push(new Player(2, player2Pos.x, player2Pos.y));
    // MyFrame.appendComponentToNode(infoGame, body);
    // MyFrame.appendComponentToNode(title, body);
    updateGame();
  });
});

function updateGame() {
  requestAnimationFrame(updateGame);
}
initializeWebSocket();
