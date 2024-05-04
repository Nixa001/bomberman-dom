import { CELL_SIZE, map, players } from "../../views/constants.js";

export function eventHandler(event) {
  const player = players[0];
  switch (event.key) {
    case "ArrowUp":
      movePlayer(player, "up");
      break;
    case "ArrowDown":
      movePlayer(player, "down");
      break;
    case "ArrowLeft":
      movePlayer(player, "left");
      break;
    case "ArrowRight":
      movePlayer(player, "right");
      break;
    case " ":
      placeBomb(player);
      break;
  }
}

export function movePlayer(player, direction) {
  let newX = player.x;
  let newY = player.y;
  switch (direction) {
    case "up":
      newY = player.y - 1;
      break;
    case "down":
      newY = player.y + 1;
      break;
    case "left":
      newX = player.x - 1;
      break;
    case "right":
      newX = player.x + 1;
      break;
  }
  if (map[newY][newX] !== 0 && map[newY][newX] !== 1) {
    player.x = newX;
    player.y = newY;
    // Update player position on the screen
    player.element.style.left = player.x * CELL_SIZE + "px";
    player.element.style.top = player.y * CELL_SIZE + "px";
  }
}
