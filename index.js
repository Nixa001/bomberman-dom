import { MyFrame } from "./framework/miniframe.js";
import { createMapDom } from "./views/playground.js";

export let color = {
  white: "#fcfefd",
  yellow: "#f2b228",
  black: "#29282d",
  blue: "#5d56a7",
};

let myMap = createMapDom();
const body = document.querySelector("body");
MyFrame.appendComponentToNode(myMap, body);
