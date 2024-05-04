import { movePlayer } from "./player/move.js";
import { collision } from "./utils/collision.js";

export const game = (event, joueurElement) => {
  // if (joueurElement) {
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
  const targetBlock = document.elementFromPoint(newX + 330, newY + 410);
  const targetBlock1 = document.elementFromPoint(newX + 280, newY + 361);
  console.log("1", targetBlock);
  if (
    (targetBlock && targetBlock.classList.contains("blockWhite")) ||
    targetBlock.classList.contains("blockPlayer") ||
    targetBlock.classList.contains("player")
  ) {
    if (
      (targetBlock1 && targetBlock1.classList.contains("blockWhite")) ||
      targetBlock1.classList.contains("blockPlayer") ||
      targetBlock1.classList.contains("player")
    ) {
      movePlayer(joueurElement, newX, newY);
    }
    console.log("2", targetBlock1);
  }
  // }
  //   console.log(event.key);
};
