import { Player } from "./controllers/player/joueur.js";
import { eventHandler, movePlayer } from "./controllers/player/move.js";
import {
  readMessageFromServer,
  sendMessageToServer,
} from "./controllers/socket/utils.js";
import { initializeWebSocket } from "./controllers/socket/websocket.js";
import { MyFrame } from "./framework/miniframe.js";
import { startPos } from "./views/constants.js";
import { gameLife, gamePlayers, gameTime } from "./views/gameInfo/gameInfo.js";
import { loginInterface } from "./views/login.js";
import {
  createChatInterface,
  messageBox,
  messageContent,
} from "./views/message.js";
import { renderMap } from "./views/playground.js";
import { Waiting } from "./views/waiting.js";
export let players = [];

let dataStore = { id: 0, pseudo: "" };
var startTime;
var elapsedTime = 0;
var timerInterval;
var secondTimer = true;
let durationInSeconds;
let lastTimer = 2;
let playerSlice;
// let DataRespID = [];
let localPlayerId;

export let map;
export let mapBonus;
document.addEventListener("DOMContentLoaded", () => {
  // let infoGame = gameInfo();
  localStorage.clear();

  const body = document.querySelector("body");
  MyFrame.appendComponentToNode(loginInterface(), body);
  // MyFrame.appendComponentToNode(userInterface(), body);

  let data;
  readMessageFromServer((event) => {
    data = JSON.parse(event.data);
    // console.log("data.state === ", data.time);
    if (data && data.state == "move") {
      movePlayer(players[data.id], data.key);
    }
    if (data && data.state == "dead") {
      players = players.filter((player) => player.id !== data.id);

      let playersLength = document.querySelector(".players");
      playersLength.textContent = "Players: " + players.length + " ";

    }
    if (data && data.state == "join") {
      // if (data.players.length > 2 && !secondTimer) {
      //   return;
      // }
      let userData = getDataFromLocalStorage();
      if (userData == null) {
        dataStore.id = data.id;
        dataStore.pseudo = data.pseudo;
        saveDataStoreToLocalStorage(dataStore);
      }
      let login = document.querySelector(".loginDiv");
      if (login) {
        login.remove();
      }

      let waitingDiv = document.querySelector(".waiting");
      if (waitingDiv) {
        waitingDiv.innerHTML = "";
        waitingDiv.style.display = "block";
      }

      map = data.map;
      mapBonus = data.mapBonus;

      MyFrame.appendComponentToNode(Waiting(data.players), waitingDiv);

      // updateGame();
      playerSlice = data.players;
      if (data.id) localPlayerId = data.id;
      // renderMap(map)
      return;
    } else if (data && data.state == "time") {
      console.log("Temps actuel :", data.time);
      durationInSeconds = data.time; // Assurez-vous que ceci correspond à la structure de vos données

      let timeText = document.querySelector(".waiting-title-text");
      if (timeText) {
        timeText.textContent = data.time;
      }
      if (data.time == 0 && data.start == true) {
        const gameContainer = document.querySelector(".game-container");
        gameContainer.style.display = "block";
        StartGame();
      }
    }
    if (data && data.state == "message") {
      // messages.push(data);
      let msg = document.querySelector(".messages");
      let content;
      // for (let i = 0; i < messages.length; i++) {
      // console.log(messages);
      content = MyFrame.createDomElement(
        "div",
        { class: "messages-content" },
        MyFrame.createDomElement(
          "div",
          { class: "message-box-content" },
          MyFrame.createDomElement(
            "span",
            { class: "message-box-contentSender" },
            data.dataResp.message
          ),

          MyFrame.createDomElement(
            "span",
            { class: "message-nameSender" },
            data.dataResp.sender
          )
        )
      );
      // }
      MyFrame.appendComponentToNode(content, msg);
    }
  });
});

initializeWebSocket();
// setInterval(() => {
//   sendMessageToServer({ type: "time", content: { data: "data" } });
// }, 1000);

// function startTimer() {
//   if (durationInSeconds) {
//     startTime = Date.now();
//     timerInterval = requestAnimationFrame(
//       updateTimer.bind(null, durationInSeconds)
//     );
//   }
// }
// function startTimer2() {
//   startTime = Date.now();
//   timerInterval = requestAnimationFrame(updateTimer.bind(null, lastTimer));
// }

// function updateTimer(durationInSeconds) {
//   var currentTime = Date.now();
//   elapsedTime = Math.floor((currentTime - startTime) / 1000);
//   let waitingTitle = document.getElementById("waiting-title-text");
//   if (waitingTitle) {
//     waitingTitle.textContent = durationInSeconds - elapsedTime;
//   }
//   if (elapsedTime >= durationInSeconds) {
//     if (secondTimer) {
//       console.log("Le timer est terminé!");
//       startTimer2();
//       secondTimer = false;
//       return;
//     }
//     setTimeout(function () {
//       console.log("L'action après le timer est lancée!");
//       const gameContainer = document.querySelector(".game-container");
//       gameContainer.style.display = "block";
//       StartGame();
//       // return;
//     }, 2000);
//   } else {
//     timerInterval = requestAnimationFrame(
//       updateTimer.bind(null, durationInSeconds)
//     );
//   }
// }

let index = 0;
function StartGame() {
  const chatTitle = createChatInterface();
  // const time = gameTime();
  const life = gameLife();
  const play = gamePlayers();

  const title = document.querySelector(".title");
  const gameInfo = document.querySelector(".game-info");
  const message = messageContent();
  const chat = document.querySelector(".chatBox");
  const gameContainer = document.querySelector(".game-container");
  const waitingDiv = document.querySelector(".waiting");
  if (index === 0) {
    const messagebox = messageBox();
    MyFrame.appendComponentToNode(chatTitle, chat);
    MyFrame.appendComponentToNode(message, chat);
    MyFrame.appendComponentToNode(messagebox, chat);
    if (chat) {
      chat.style.display = "block";
    }
    index++;
  }
  if (title) {
    title.style.display = "block";
  }
  MyFrame.appendComponentToNode(play, gameInfo);
  MyFrame.appendComponentToNode(life, gameInfo);
  // MyFrame.appendComponentToNode(time, gameInfo)
  gameContainer.style.display = "block";
  if (gameInfo) {
    gameInfo.style.display = "block";
  }
  if (waitingDiv) {
    waitingDiv.remove();
  }
  renderMap(map);
  console.log(playerSlice);
  playerSlice.forEach((player) => {
    let id = player.id;
    let xPlayer = startPos[id].x;
    let yPlayer = startPos[id].y;
    let playerPos = {
      id: id,
      pseudo: player.pseudo,
      x: xPlayer,
      y: yPlayer,
      live: 3,
    };
    players.push(
      new Player(playerPos.id, playerPos.pseudo, playerPos.x, playerPos.y)
    );
    // console.log(id, playerSlice[index].id);
    let playersLength = document.querySelector(".players");
    playersLength.textContent = "Players: " + players.length + " ";
    console.log(players);
    // index = index + 1;
  });

  MyFrame.attachEventHandler(document, "keyup", (event) => {
    // if (id == localPlayerId) {
    console.log("-----------------------------------------");
    let userData = getDataFromLocalStorage();
    eventHandler(event, userData.id);
    // }
  });
}
export function saveDataStoreToLocalStorage(dataStore) {
  localStorage.setItem("bombermanData", JSON.stringify(dataStore));
}
export function getDataFromLocalStorage() {
  const storedData = localStorage.getItem("bombermanData");
  if (storedData) {
    return JSON.parse(storedData);
  }
  return null;
}
