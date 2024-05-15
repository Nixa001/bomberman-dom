import { Player } from "./controllers/player/joueur.js";
import { eventHandler } from "./controllers/player/move.js";
import { readMessageFromServer } from "./controllers/socket/utils.js";
import { initializeWebSocket } from "./controllers/socket/websocket.js";
import { MyFrame } from "./framework/miniframe.js";
import { messages, players, startPos } from "./views/constants.js";
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
  // MyFrame.appendComponentToNode(userInterface(), body);

  let data;
  readMessageFromServer((event) => {
    data = JSON.parse(event.data);
    if (data && data.state == "join") {
      //     if (data.players.length > 4) {
      //       return;
      //     }
      let login = document.querySelector(".loginDiv");
      if (login) {
        login.remove();
      }
      MyFrame.appendComponentToNode(infoGame, body); //
      MyFrame.appendComponentToNode(title, body);
      MyFrame.appendComponentToNode(messageBox, body);

      //     let waitingDiv = document.querySelector(".waiting");
      //     if (waitingDiv) {
      //       waitingDiv.remove();
      //     }
      //     MyFrame.appendComponentToNode(Waiting(data.players), body);

      //     // return;
      //     renderMap();

      //     data.players.forEach((player) => {
      //       const id = player.id;
      //       let xPlayer = startPos[id].x;
      //       let yPlayer = startPos[id].y;
      //       let playerPos = {
      //         id: id,
      //         pseudo: player.pseudo,
      //         x: xPlayer,
      //         y: yPlayer,
      //       };
      //       players.push(
      //         new Player(playerPos.id, playerPos.pseudo, playerPos.x, playerPos.y)
      //       );
      //       if (id == data.dataResp.id) {
      //         MyFrame.attachEventHandler(document, "keydown", (event) => {
      //           eventHandler(event, id);
      //         });
      //       }
      //     });
    }
    //   updateGame();
    if (data && data.state == "message") {
      messages.push(data);
      let msg = document.querySelector(".messages");
      let content;
      for (let i = 0; i < messages.length; i++) {
        console.log(messages);
        content = MyFrame.createDomElement("div",
          { class: "messages-content" },
          MyFrame.createDomElement(
            "div",
            { class: "message-box-content" },
            MyFrame.createDomElement(
              "span",
              { class: "message-box-contentSender" },
              messages[messages.length - 1].dataResp.message
            ),

            MyFrame.createDomElement(
              "span",
              { class: "message-nameSender" },
              messages[messages.length - 1].dataResp.sender
            ),
          ),
        )
      }
      MyFrame.appendComponentToNode(content, msg);
    }
  });
});

function updateGame() {
  requestAnimationFrame(updateGame);
}
initializeWebSocket();
