import { eventHandler } from "../controllers/player/move.js";
import { MyFrame } from "../framework/miniframe.js";
import { CELL_SIZE, MAP_SIZEX, MAP_SIZEY, map } from "./constants.js";

export function renderMap() {
  const gameContainer = MyFrame.createDomElement("div", {
    id: "game-container",
    class: "game-container",
  });
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
        if (Math.random() < 0.2) {
          cell.classList.add("block");
        } else {
          map[i][j] = 2;
        }
      }
      const body = document.querySelector("body");
      MyFrame.appendComponentToNode(cell, gameContainer);
      MyFrame.appendComponentToNode(gameContainer, body);
    }
  }
}

