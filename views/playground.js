import { createMap } from "../controllers/maps/maps.js";
export const createMapDom = () => {
  let myMap = createMap();
  console.log(myMap);
  let mainContainer = document.createElement("div");
  mainContainer.classList.add("main-container");

  for (let i = 0; i < myMap.length; i++) {
    let lineContainer = document.createElement("div");
    lineContainer.classList.add("line-container");

    for (let j = 0; j < myMap[i].length; j++) {
      let element;
      switch (myMap[i][j]) {
        case 0:
          element = document.createElement("div");
          element.classList.add("mur");
          element.style.backgroundColor = "red";
          break;
        case 1:
          let randonVal = Math.random() < 0.5 ? "A" : "B";
          console.log("Valeur genere = ", randonVal);
          element = document.createElement("div");
          element.classList.add("bombe");
          if (randonVal === "A") {
            element.style.backgroundColor = "blue";
          } else {
            element.style.backgroundColor = "white";
          }
          break;
        case 2:
          element = document.createElement("div");
          element.classList.add("joueur");
          element.style.backgroundColor = "white";
          break;
        // Ajoutez d'autres cas si nécessaire
      }
      if (element === 1) {
      }

      if (element) {
        element.style.top = `${i * 50}px`;
        element.style.left = `${j * 50}px`;
        element.style.width = `${110}px`;
        element.style.height = `${110}px`;
        //    element.style.backgroundColor = "red"
        lineContainer.appendChild(element);
      }
      if ((i % 2 != 0 && (j === 0 || j === myMap[i].length - 1))) {
        element.style.background = "orange";
      }
      if ((j % 2 != 0 && (i === 0 || i === myMap.length - 1))) {
        element.style.background = "orange";
      }
    }

    mainContainer.appendChild(lineContainer);
  }

  return mainContainer;
};
