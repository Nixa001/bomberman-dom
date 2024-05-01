import { MyFrame } from "./framework/miniframe.js";
import { createChatInterface } from "./views/message.js";
import { createMapDom } from "./views/playground.js";

export let color = {
  white: "#fcfefd",
  yellow: "#f2b228",
  black: "#29282d",
  blue: "#5d56a7",
};

let myMap = createMapDom();
let messageBox = createChatInterface();
let title = MyFrame.createDomElement("div", { class: "titleDiv" });

const body = document.querySelector("body");
MyFrame.appendComponentToNode(title, body);
MyFrame.appendComponentToNode(myMap, body);
MyFrame.appendComponentToNode(messageBox, body);
