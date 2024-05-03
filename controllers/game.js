import { movePlayer } from "./player/move.js";
import { collision } from "./utils/collision.js";

export const game = (event, joueurElement) => {
  if (joueurElement) {
    //   console.log("joueur = ", joueurElement);
    const currentPosition =
      joueurElement.style.transform.match(/translate\(([^)]+)\)/);
    let x = 0,
      y = 0;

    if (currentPosition) {
      x = parseInt(currentPosition[1].split(",")[0]);
      y = parseInt(currentPosition[1].split(",")[1]);
    }

    let newX = x,
      newY = y;

    switch (event.key) {
      case "ArrowLeft":
        newX -= 10;
        break;
      case "ArrowRight":
        newX += 10;
        break;
      case "ArrowUp":
        newY -= 10;
        break;
      case "ArrowDown":
        newY += 10;
        break;
      default:
        break;
    }
    // const targetBlock = document.elementFromPoint(newX, newY);
    // console.log(targetBlock);
    // if (targetBlock && targetBlock.classList.contains("blockWhite")) {
    // }
    movePlayer(joueurElement, newX, newY);
  }
  //   console.log(event.key);
};
