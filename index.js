import { initializeWebSocket } from "./controllers/socket/websocket.js";
import { MyFrame } from "./framework/miniframe.js";
import { gameInfo } from "./views/gameInfo/gameInfo.js";
import { loginInterface } from "./views/login.js";
import { createChatInterface } from "./views/message.js";
import { createMapDom } from "./views/playground.js";

export let color = {
  white: "#fcfefd",
  yellow: "#f2b228",
  black: "#29282d",
  blue: "#5d56a7",
};
let infoGame = gameInfo();
let myMap = createMapDom();
let messageBox = createChatInterface();
let title = MyFrame.createDomElement("div", { class: "titleDiv" });
const body = document.querySelector("body");
MyFrame.appendComponentToNode( loginInterface(), body);
// MyFrame.appendComponentToNode(title, body);
// MyFrame.appendComponentToNode(infoGame, body);
// MyFrame.appendComponentToNode(myMap, body);
// MyFrame.appendComponentToNode(messageBox, body);
initializeWebSocket();

