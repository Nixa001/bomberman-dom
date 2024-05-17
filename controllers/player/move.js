import {
  getDataFromLocalStorage,
  map,
  mapBonus,
  players,
} from "../../index.js";
import { CELL_SIZE } from "../../views/constants.js";
import { anotheBomb, placeBomb, playerLive } from "../bomb/bomb.js";
import { sendMessageToServer } from "../socket/utils.js";
let firstSpeed = true;
let expireTimeSpeed = false;
export let BonusDualBomb = false;
let keydownHandler;
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

  let value = {
    id: userData.id,
    pseudo: userData.pseudo,
    key: event.key,
    bonusDualBomb: BonusDualBomb,
    anotheBomb: anotheBomb.canPlaceBomb,
  };
  // if (event.key == " ") sendMessageToServer({ type: "move", content: value });
  // else
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
  if (map[newY][newX] == 2) {
    player.x = newX;
    player.y = newY;
    player.element.style.left = player.x * CELL_SIZE + "px";
    player.element.style.top = player.y * CELL_SIZE + "px";
    if (mapBonus[newY][newX] == 4) {
      if (firstSpeed) {
        const keydownHandler = (event) => {
          eventHandler(event, player.id);
        };

        document.addEventListener("keydown", keydownHandler);
        setTimeout(() => {
          document.removeEventListener("keydown", keydownHandler);
          firstSpeed = true;
        }, 5000);

        firstSpeed = false;
      }
    }
    if (mapBonus[newY][newX] == 3) {
      BonusDualBomb = true;
    }
    if (mapBonus[newY][newX] == 5) {
      let userData = getDataFromLocalStorage();
      if (userData.id == player.id) {
        player.live++;
        let life = document.querySelector(".life");
        life.innerHTML = "life: " + player.live;
      }

      // playerLive++;
    }

    // Calculer la position de la cellule dans le DOM
    const cellPosition = {
      left: newX * CELL_SIZE + "px",
      top: newY * CELL_SIZE + "px",
    };
    // Trouver la cellule actuelle dans le DOM
    const cells = document.querySelectorAll(".cell");
    let targetCell;
    cells.forEach((cell) => {
      if (
        cell.style.left === cellPosition.left &&
        cell.style.top === cellPosition.top
      ) {
        targetCell = cell;
      }
    });

    if (targetCell) {
      // créez une nouvelle cellule et remplacez l'ancienne
      const newCell = document.createElement("div");
      newCell.classList.add("cell", "new-class");
      newCell.style.left = cellPosition.left;
      newCell.style.top = cellPosition.top;

      targetCell.parentNode.replaceChild(newCell, targetCell);
      mapBonus[newY][newX] = 2;
    }
  }
}
