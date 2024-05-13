import { eventHandler } from "../controllers/player/move.js";
import { MyFrame } from "../framework/miniframe.js";
import { CELL_SIZE, MAP_SIZEX, MAP_SIZEY } from "./constants.js";

export function renderMap(map) {
  const gameContainer = document.querySelector(".game-container");
  for (let i = 0; i < MAP_SIZEX; i++) {
    for (let j = 0; j < MAP_SIZEY; j++) {
      const cell = MyFrame.createDomElement("div", {
        class: "cell",
      });
      cell.style.left = j * CELL_SIZE + "px";
      cell.style.top = i * CELL_SIZE + "px";
      if (map[i][j] === 0) {
        cell.classList.add("wall");
      } else if (map[i][j] === 1) {
        cell.classList.add("block");
      }
      MyFrame.appendComponentToNode(cell, gameContainer);
    }
  }
  const body = document.querySelector("body");
  MyFrame.appendComponentToNode(gameContainer, body);
}
