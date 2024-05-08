import { MyFrame } from "../../framework/miniframe.js";
import { players } from "../../views/constants.js";
import { CELL_SIZE, map } from "../../views/constants.js";

export const BOMB_TIMER = 3000;
export let canPlaceBomb = false;

export function placeBomb(player) {
  if (canPlaceBomb) {
    return;
  }

  canPlaceBomb = true;
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
    canPlaceBomb = false;
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

function replaceBlock(explosionPosition) {
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
      map[blockPosition.y][blockPosition.x] = 2;
    }
  });
}

function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

let playerLive = 3;
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
        if (
          player.x === bombPosition.x &&
          player.y === bombPosition.y &&
          isFirstTimeExplosed
        ) {
          console.log("Explose");
          playerLive--;
          if (playerLive == 0) {
            alert("Vous avez perdu");
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

  canPlaceBomb = false;
}
