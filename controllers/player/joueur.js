import { MyFrame } from "../../framework/miniframe.js";
import { CELL_SIZE } from "../../views/constants.js";

export class Player {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.element = MyFrame.createDomElement("div", {});
    this.element.classList.add("player");
    this.element.style.left = this.x * CELL_SIZE + "px";
    this.element.style.top = this.y * CELL_SIZE + "px";
    let gameContainer = document.querySelector("#game-container");
    MyFrame.appendComponentToNode(this.element, gameContainer);
  }
}
