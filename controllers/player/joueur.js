import { MyFrame } from "../../framework/miniframe.js";

export const createPlayer = (joueurs) => {
  console.log(joueurs);
  return joueurs.map((element) => {
    return MyFrame.createDomElement("div", {
      className: `player ${element.pseudo}`,
      id: "player",
    });
  });
};

export class Player {
    constructor(pseudo, x, y, player) {
      this.pseudo = pseudo;
      this.x = x;
      this.y = y;
      this.player = player
    }
  
    
    moveUp() {
      this.y--;
    }

    moveDown() {
      this.y++;
    }

    moveLeft() {
      this.x--;
    }

    moveRight() {
      this.x++;
    }
  
}
