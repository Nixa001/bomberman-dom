import { game } from "../controllers/game.js";
import { createMap } from "../controllers/maps/maps.js";
import { Player } from "../controllers/player/joueur.js";
import {
  getPositionRelativeToParent,
  getPositionRelativeToParentElem,
} from "../controllers/utils/getPosition.js";
import { MyFrame } from "../framework/miniframe.js";
import { color } from "../index.js";

export const createMapDom = () => {
  let myMap = createMap();
  let isPosPlayer = false;
  let mapPositionPlayer = [];
  console.log(myMap);
  let mainContainer = MyFrame.createDomElement("div", {
    class: "main-container",
  });

  for (let i = 0; i < myMap.length; i++) {
    let lineContainer = MyFrame.createDomElement("div", {
      class: "line-container",
    });

    for (let j = 0; j < myMap[i].length; j++) {
      let element;
      switch (myMap[i][j]) {
        case 0:
          element = MyFrame.createDomElement("div", { class: "mur" });
          // element.style.backgroundColor = color.black;
          break;
        case 1:
          let randonVal = Math.random() < 0.7 ? "A" : "B";
          randonVal === "A"
            ? (element = MyFrame.createDomElement("div", {
                class: "block blockA",
              }))
            : (element = MyFrame.createDomElement("div", {
                class: "block blockB",
              }));
          break;
        case 2:
          element = MyFrame.createDomElement("div", {
            class: "block blockB",
          });
          // element.style.backgroundColor = color.white;
          break;

        case 3:
          element = MyFrame.createDomElement("div", {
            class: "block blockDestructible",
          });
          // element.style.backgroundColor = color.yellow;
          break;
        case 4:
          element = MyFrame.createDomElement("div", {
            class: "block blockB",
          });
          if (element && mainContainer) {
            console.log("---", element);
            setTimeout(() => {
              let positionPlayer = getPositionRelativeToParentElem(
                element,
                mainContainer
              );
              mapPositionPlayer.push(positionPlayer);
              // console.log("aaaaaaaaaaaaaaaaa ", mapPositionPlayer);
            }, 0);
          }
          break;
      }
      if (element) {
        // element.style.top = `${i * 50}px`;
        // element.style.left = `${j * 50}px`;
        // element.style.width = `${80}px`;
        // element.style.height = `${80}px`;

        lineContainer.appendChild(element);
      }
      element.style.border = `1px solid ${color.black}`;
      if (
        (i % 2 != 0 && (j === 0 || j === myMap[i].length - 1)) ||
        (j % 2 != 0 && (i === 0 || i === myMap.length - 1))
      ) {
        // element.style.border = `1px solid ${color.black}`;
        // element.style.outline = `none`;
        // element.style.background = color.yellow;
      }
    }
    mainContainer.appendChild(lineContainer);
  }

  let pseudo = "ibg";
  let x = 0,
    y = 0;
  let a = MyFrame.createDomElement("div", {
    className: `player ${pseudo}`,
    id: "player",
  });
  let joueur = new Player("ibg", x, y, a);
  // console.log(joueur);
  mainContainer.appendChild(joueur.player);

  document.addEventListener("keydown", (event) => {
    game(event, joueur.player);
    let positionPlayer = getPositionRelativeToParent();
    console.log("Position du player = ", positionPlayer);
  });

  // console.log(mapPositionPlayer);
  mapPositionPlayer.map((elementPosition) => {
    console.log("position = ", elementPosition);
  });

  if (mapPositionPlayer) {
    for (const iterator of mapPositionPlayer) {
      console.log("==== ", iterator);
    }
  }
  return mainContainer;
};
