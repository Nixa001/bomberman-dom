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
  localStorage.clear();

  const body = document.querySelector("body");
  MyFrame.appendComponentToNode(loginInterface(), body);
  let data;
  readMessageFromServer((event) => {
    data = JSON.parse(event.data);
    if (data && data.state == "move") {
      movePlayer(players[data.id], data.key);
    }
    let a = 0
    if (data && data.state == "dead") {
      players[data.id].removeGamer();
      players = players.filter((player) => player.id !== data.id);
      if (players.length === 1) {
        let lose = document.querySelector(".lose");
        lose.style.display = "block";
        lose.innerHTML = " your Win!!!";
      }
      let playersLength = document.querySelector(".players");
      playersLength.textContent = "Players: " + players.length + " ";
    }
    if (data && data.state == "join") {
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
      playerSlice = data.players;
      if (data.id) localPlayerId = data.id;
      return;
    } else if (data && data.state == "time") {
      let timeText = document.querySelector(".waiting-title-text");
      if (timeText) {
        timeText.textContent = data.time;
      }
      if (data.time == 0 && data.start == true) {
        const gameContainer = document.querySelector(".game-container");
        gameContainer.style.display = "block";
        console.log(players) 
          initialGame();     
      }
    }
    if (data && data.state == "message") {
      let msg = document.querySelector(".messages");
      let content;
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
      MyFrame.appendComponentToNode(content, msg);
    }
  });
});

initializeWebSocket();

function initialGame() {
  requestAnimationFrame(StartGame);
}

let index = 0;
function StartGame() {
  const chatTitle = createChatInterface();
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
  gameContainer.style.display = "block";
  if (gameInfo) {
    gameInfo.style.display = "block";
  }
  if (waitingDiv) {
    waitingDiv.remove();
  }
  renderMap(map);
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
    let playersLength = document.querySelector(".players");
    playersLength.textContent = "Players: " + players.length + " ";
  });

  MyFrame.attachEventHandler(document, "keyup", (event) => {
    let userData = getDataFromLocalStorage();
    const messageInput = document.querySelector(".message-input");
    if (document.activeElement === messageInput) {
      return;
    }
    eventHandler(event, userData.id);
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
