import { createMap } from "../controllers/maps/maps.js";
import { MyFrame } from "../framework/miniframe.js";
import { color } from "../index.js";

export const createMapDom = () => {
  let myMap = createMap();
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
          element.style.backgroundColor = color.black;
          break;
        case 1:
          let randonVal = Math.random() < 0.7 ? "A" : "B";
          element = MyFrame.createDomElement("div", { class: "block" });
          randonVal === "A"
            ? (element.style.backgroundColor = color.yellow)
            : (element.style.backgroundColor = color.white);
          break;
        case 2:
          element = MyFrame.createDomElement("div", { class: "joueur" });
          element.style.backgroundColor = color.white;
          break;

        case 3:
          element = MyFrame.createDomElement("div", { class: "block" });
          element.style.backgroundColor = color.yellow;
          break;
      }
      if (element) {
        // element.style.top = `${i * 50}px`;
        // element.style.left = `${j * 50}px`;
        element.style.width = `${80}px`;
        element.style.height = `${80}px`;

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

  return mainContainer;
};
