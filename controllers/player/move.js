import { getDataFromLocalStorage, map } from "../../index.js";
import { CELL_SIZE, players } from "../../views/constants.js";
import { placeBomb } from "../bomb/bomb.js";
import { sendMessageToServer } from "../socket/utils.js";

export function eventHandler(event, id) {
  const player = players[id];
  // switch (event.key) {
  //   case "ArrowUp":
  //     movePlayer(player, "up");
  //     break;
  //   case "ArrowDown":
  //     movePlayer(player, "down");
  //     break;
  //   case "ArrowLeft":
  //     movePlayer(player, "left");
  //     break;
  //   case "ArrowRight":
  //     movePlayer(player, "right");
  //     break;
  //   case " ":
  //     placeBomb(player);
  //     break;
  // }
  let userData = getDataFromLocalStorage();

  let value = { id: userData.id, pseudo: userData.pseudo, key: event.key };
  sendMessageToServer({ type: "move", content: value });
}

export function movePlayer(player, direction) {
  let newX = player.x;
  let newY = player.y;
  switch (direction) {
    case "ArrowUp":
      newY = player.y - 1;
      break;
    case "ArrowDown":
      newY = player.y + 1;
      break;
    case "ArrowLeft":
      // alert("LEft");
      newX = player.x - 1;
      break;
    case "ArrowRight":
      newX = player.x + 1;
      break;
    case " ":
      placeBomb(players[player.id]);
      break;
  }
  if (map[newY][newX] !== 0 && map[newY][newX] !== 1) {
    player.x = newX;
    player.y = newY;
    player.element.style.left = player.x * CELL_SIZE + "px";
    player.element.style.top = player.y * CELL_SIZE + "px";
  }
}
