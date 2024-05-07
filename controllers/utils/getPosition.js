export const getPositionRelativeToParent = () => {
  let element = document.getElementById("player");
  let mainContainer = document.querySelector(".main-container");
  let playerRect = element.getBoundingClientRect();
  let mainContainerRect = mainContainer.getBoundingClientRect();

  // Calculer les coordonnées du joueur par rapport à l'élément parent .main-container
  let playerX = playerRect.left - mainContainerRect.left;
  let playerY = playerRect.top - mainContainerRect.top;

  return { x: playerX, y: playerY };
};

export const getPositionRelativeToParentElem = (element, mainContainer) => {
  let playerRect = element.getBoundingClientRect();
  let mainContainerRect = mainContainer.getBoundingClientRect();

  // Calculer les coordonnées du joueur par rapport à l'élément parent .main-container
  let playerX = playerRect.left;
  let playerY = playerRect.top;

  return { x: playerX, y: playerY };
};
