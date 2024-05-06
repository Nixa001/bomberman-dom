import { MyFrame } from "../../framework/miniframe.js";
import { CELL_SIZE, map } from "../../views/constants.js";

export const BOMB_TIMER = 3000;

export function placeBomb(player) {
  const cellToExplode = [];

  // Place la bombe initiale
  cellToExplode.push(createBomb(player.x, player.y));

  // Place des bombes sur les quatre côtés
  for (let index = 1; index <= 4; index++) {
    let xPos = player.x + (index === 1 ? 1 : index === 2 ? -1 : 0);
    let yPos = player.y + (index === 3 ? 1 : index === 4 ? -1 : 0);

    if (isValidPosition(xPos, yPos)) {
      cellToExplode.push(createBomb(xPos, yPos, false));
    }
  }

  setTimeout(() => explodeBomb(cellToExplode), BOMB_TIMER);
}

function createBomb(x, y, initial = true) {
  const bomb = MyFrame.createDomElement("div", { class: "bomb" });
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

function explodeBomb(cellToExplode) {
  let isInitBomb = true;

  cellToExplode.forEach((bomb) => {
    document.getElementById("game-container").appendChild(bomb);
    bomb.classList.add("bombExploded");
    setTimeout(() => {
      bomb.remove();
      const explosionPosition = {
        x: parseInt(bomb.style.left) / CELL_SIZE,
        y: parseInt(bomb.style.top) / CELL_SIZE,
      };
      //   const explosionRadius = 1;
      if (isInitBomb) {
        replaceBlock(explosionPosition);
        isInitBomb = false;
      }
    }, 1100);
  });
}
