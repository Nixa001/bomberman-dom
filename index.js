import { Player } from "./controllers/player/joueur.js";
import { eventHandler } from "./controllers/player/move.js";
import { readMessageFromServer } from "./controllers/socket/utils.js";
import { initializeWebSocket } from "./controllers/socket/websocket.js";
import { MyFrame } from "./framework/miniframe.js";
import { players, startPos } from "./views/constants.js";
// import { gameInfo } from "./views/gameInfo/gameInfo.js";
import { loginInterface } from "./views/login.js";
// import { createChatInterface } from "./views/message.js";
import { renderMap } from "./views/playground.js";
import { Waiting } from "./views/waiting.js";

var startTime;
var elapsedTime = 0;
var timerInterval;
var secondTimer = true;
let durationInSeconds = 3;
let lastTimer = 2;
let playerSlice;
// let DataRespID = [];
let localPlayerId;

export let map;
document.addEventListener("DOMContentLoaded", () => {
  // let infoGame = gameInfo();
  // let messageBox = createChatInterface();
  const body = document.querySelector("body");
  MyFrame.appendComponentToNode(loginInterface(), body);
  let data;
  readMessageFromServer((event) => {
    data = JSON.parse(event.data);
    if (data && data.state == "join") {
      if (data.players.length > 2 && !secondTimer) {
        return;
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
      MyFrame.appendComponentToNode(Waiting(data.players), waitingDiv);
      if (data.players.length > 1) {
        startTimer();
      }
      // updateGame();
      playerSlice = data.players;
      if (data.dataResp.id) localPlayerId = data.dataResp.id;
      return;
      console.log(data.map);
      renderMap(map);
    }
  });
});

initializeWebSocket();

function startTimer() {
  startTime = Date.now();
  timerInterval = requestAnimationFrame(
    updateTimer.bind(null, durationInSeconds)
  );
}
function startTimer2() {
  startTime = Date.now();
  timerInterval = requestAnimationFrame(updateTimer.bind(null, lastTimer));
}

function updateTimer(durationInSeconds) {
  var currentTime = Date.now();
  elapsedTime = Math.floor((currentTime - startTime) / 1000);
  let waitingTitle = document.getElementById("waiting-title-text");
  if (waitingTitle) {
    waitingTitle.textContent = durationInSeconds - elapsedTime;
  }
  if (elapsedTime >= durationInSeconds) {
    if (secondTimer) {
      console.log("Le timer est terminé!");
      startTimer2();
      secondTimer = false;
      return;
    }
    setTimeout(function () {
      console.log("L'action après le timer est lancée!");
      const gameContainer = document.querySelector(".game-container");
      gameContainer.style.display = "block";
      StartGame();
      // return;
    }, 2000);
  } else {
    timerInterval = requestAnimationFrame(
      updateTimer.bind(null, durationInSeconds)
    );
  }
}

let index = 0;
function StartGame() {
  const waitingDiv = document.querySelector(".waiting");
  const title = document.querySelector(".title");
  if (title) {
    title.style.display = "block";
  }
  if (waitingDiv) {
    waitingDiv.remove();
  }
  renderMap(map);
  console.log(playerSlice);
  playerSlice.forEach((player) => {
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
    console.log(id, playerSlice[index].id);
    MyFrame.attachEventHandler(document, "keydown", (event) => {
      if (id == localPlayerId) {
        eventHandler(event, localPlayerId);
      }
    });
    console.log(players);
    // index = index + 1;
  });
}
