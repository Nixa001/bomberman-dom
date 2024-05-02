import { movePlayer } from "./player/move.js";

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

    switch (event.key) {
      case "ArrowLeft":
        movePlayer(joueurElement, x - 10, y);
        break;
      case "ArrowRight":
        movePlayer(joueurElement, x + 10, y);
        break;
      case "ArrowUp":
        movePlayer(joueurElement, x, y - 10);
        break;
      case "ArrowDown":
        movePlayer(joueurElement, x, y + 10);
        break;
      default:
        break;
    }
  }
//   console.log(event.key);
};
// document.addEventListener("keydown", game);
