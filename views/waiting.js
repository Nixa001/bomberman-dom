import { MyFrame } from "../framework/miniframe.js";

export const Waiting = (tabUser) => {
  let counter = 20; // Initialisez le compteur
  let play = false;
  let wait = "Waiting for player";
  // Fonction pour incrémenter le compteur et mettre à jour le DOM
  const updateCounter = () => {
    if (play && counter === 0) {
      counter = counter;
    } else {
      if (tabUser.length > 1) {
        counter--;
      }
      console.log(tabUser.length);
    }

    if (counter < 0) {
      clearInterval(updateCounter);
      counter = 11;
      play = true;
      wait = "Game star-up in";
      return;
    }
    const waitingElement = document.querySelector(".waiting-title-text");
    if (waitingElement) {
      waitingElement.textContent = `${wait} ... ${counter}`;
    }
  };
  // Appelez updateCounter toutes les secondes
  setInterval(updateCounter, 1000);

  const userList = tabUser.map((user) =>
    MyFrame.createDomElement(
      "div",
      { class: "user" },
      MyFrame.createDomElement(
        "span",
        { class: "playerWatinmg" },
        `Player ${user.id}:`
      ),
      MyFrame.createDomElement(
        "span",
        { class: "user-name" },
        `Username: ${user.pseudo}`
      )
    )
  );

  return MyFrame.createDomElement(
    "div",
    { class: "waiting" },
    MyFrame.createDomElement(
      "div",
      { class: "waiting-title" },
      MyFrame.createDomElement(
        "figure",
        { class: "avatar" },
        MyFrame.createDomElement(
          "img",
          //   { class: "avatar-img", src: "/views/styles/assets/floor.png" },
          ""
        )
      ),
      MyFrame.createDomElement(
        "h1",
        { class: "waiting-title-text" },
        `${wait} ... ${counter}` // Utilisez le compteur ici
      )
    ),
    ...userList
  );
};
