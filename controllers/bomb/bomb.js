import { MyFrame } from "../../framework/miniframe.js";
import {
  getDataFromLocalStorage,
  map,
  mapBonus,
  players,
} from "../../index.js";
import { CELL_SIZE } from "../../views/constants.js";
import { BonusDualBomb } from "../player/move.js";
import { sendMessageToServer } from "../socket/utils.js";

export const BOMB_TIMER = 3000;
export let anotheBomb = { canPlaceBomb: true };
export let time = 1100;
// export let cellToExplode = [];
export let playerLive = 3;
let counterEvenBomb = 2;

export function placeBomb(player) {
  if (anotheBomb.canPlaceBomb == false) {
    setTimeout(() => {
      anotheBomb.canPlaceBomb = true;
    }, 3000);
    return;
  }

  // if (!BonusDualBomb) {
  //   anotheBomb.canPlaceBomb = true;
  setTimeout(() => {
    anotheBomb.canPlaceBomb = false;
  }, 3000);
  // } else {
  //   if (counterEvenBomb % 5 == 0) {
  //     anotheBomb.canPlaceBomb = true;
  //   }
  // }
  // counterEvenBomb++;
  const cellToExplode = [];

  cellToExplode.push(createBomb(player.x, player.y));

  for (let index = 1; index <= 4; index++) {
    let xPos = player.x + (index === 1 ? 1 : index === 2 ? -1 : 0);
    let yPos = player.y + (index === 3 ? 1 : index === 4 ? -1 : 0);

    if (isValidPosition(xPos, yPos)) {
      cellToExplode.push(createBomb(xPos, yPos, false));
    }
  }
  setTimeout(() => {
    explodeBomb(cellToExplode);
    anotheBomb.canPlaceBomb = false;
  }, BOMB_TIMER);
}

export function placeBombOther(player, bonus, anotherBomb) {
  if (anotherBomb) {
    return;
  }

  if (!bonus) {
    anotherBomb = true;
    setTimeout(() => {
      anotherBomb = true;
    }, 5000);
  }
  // else {
  //   if (counterEvenBomb % 5 == 0) {
  //     anotheBomb.canPlaceBomb = true;
  //   }
  // }
  const cellToExplode = [];

  cellToExplode.push(createBomb(player.x, player.y));

  for (let index = 1; index <= 4; index++) {
    let xPos = player.x + (index === 1 ? 1 : index === 2 ? -1 : 0);
    let yPos = player.y + (index === 3 ? 1 : index === 4 ? -1 : 0);

    if (isValidPosition(xPos, yPos)) {
      cellToExplode.push(createBomb(xPos, yPos, false));
    }
  }
  setTimeout(() => {
    explodeBomb(cellToExplode);
    anotheBomb.canPlaceBomb = false;
  }, BOMB_TIMER);
}
function createBomb(x, y, initial = true) {
  const bomb = document.createElement("div");
  bomb.classList.add("bomb");

  bomb.style.left = x * CELL_SIZE + "px";
  bomb.style.top = y * CELL_SIZE + "px";

  if (!initial) {
    bomb.style.visibility = "hidden";
  }

  setTimeout(() => {
    bomb.classList.add("bombExplosed");
    bomb.style.visibility = "visible";
  }, 3000);

  document.getElementById("game-container").appendChild(bomb);
  return bomb;
}

function isValidPosition(x, y) {
  return (
    x >= 0 && x < map[0].length && y >= 0 && y < map.length && map[y][x] !== 0
  );
}

export function replaceBlock(explosionPosition) {
  const gameContainer = document.getElementById("game-container");
  const blocks = gameContainer.querySelectorAll(".block");

  blocks.forEach((block) => {
    const blockPosition = {
      x: parseInt(block.style.left) / CELL_SIZE,
      y: parseInt(block.style.top) / CELL_SIZE,
    };
    const distance = calculateDistance(
      explosionPosition.x,
      explosionPosition.y,
      blockPosition.x,
      blockPosition.y
    );

    if (distance === 1) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.style.left = block.style.left;
      cell.style.top = block.style.top;
      gameContainer.replaceChild(cell, block);
      if (map[blockPosition.y][blockPosition.x] == 3) {
        cell.classList.add("power3");
        // mapBonus[blockPosition.y][blockPosition.x] = 3;
      }
      if (map[blockPosition.y][blockPosition.x] == 4) {
        cell.classList.add("power4");
        // mapBonus[blockPosition.y][blockPosition.x] = 4;
      }
      if (map[blockPosition.y][blockPosition.x] == 5) {
        cell.classList.add("power5");
        // mapBonus[blockPosition.y][blockPosition.x] = 5;
      }
      // console.log(map);
      map[blockPosition.y][blockPosition.x] = 2;
      console.log(map);
      console.log(mapBonus);
    }
  });
}

function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function explodeBomb(cellToExplode) {
  let isInitBomb = true;
  let isFirstTimeExplosed = true;
  const intervalId = setInterval(() => {
    players.forEach((player) => {
      cellToExplode.forEach((bomb) => {
        const bombPosition = {
          x: parseInt(bomb.style.left) / CELL_SIZE,
          y: parseInt(bomb.style.top) / CELL_SIZE,
        };
        let userData = getDataFromLocalStorage();
        if (
          player.x === bombPosition.x &&
          player.y === bombPosition.y &&
          isFirstTimeExplosed &&
          userData.id == player.id
        ) {
          // players
          player.live--;
          let life = document.querySelector(".life");
          life.innerHTML = "life: " + player.live;
          console.log("Explose");
          if (player.live == 0) {
            let userData = getDataFromLocalStorage();
            let value = {
              id: userData.id,
              pseudo: userData.pseudo,
            };
            sendMessageToServer({ type: "dead", content: value });
          }
          isFirstTimeExplosed = false;
          return;
        }
      });
    });
  }, 200);
  setTimeout(() => {
    clearInterval(intervalId);
  }, 1100);
  cellToExplode.forEach((bomb) => {
    document.getElementById("game-container").appendChild(bomb);
    bomb.classList.add("bombExploded");
    setTimeout(() => {
      bomb.remove();
      const explosionPosition = {
        x: parseInt(bomb.style.left) / CELL_SIZE,
        y: parseInt(bomb.style.top) / CELL_SIZE,
      };
      if (isInitBomb) {
        replaceBlock(explosionPosition);
        isInitBomb = false;
      }
    }, 1100);
  });
  anotheBomb.canPlaceBomb = false;
}
