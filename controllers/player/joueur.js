import { MyFrame } from "../../framework/miniframe.js";
import { CELL_SIZE } from "../../views/constants.js";

export class Player {
  constructor(id, pseudo, x, y) {
    this.id = id;
    this.pseudo = pseudo;
    this.x = x;
    this.y = y;
    this.live = 3;
    this.canPlaceBomb = true;
    this.bombCount = 0;
    this.canPlaceTwoBombs = false;
    this.limitBomb = 1;
    this.element = MyFrame.createDomElement("div", {});
    this.element.classList.add("player");
    this.element.style.left = this.x * CELL_SIZE + "px";
    this.element.style.top = this.y * CELL_SIZE + "px";
    let gameContainer = document.querySelector("#game-container");
    MyFrame.appendComponentToNode(this.element, gameContainer);
  }
}
