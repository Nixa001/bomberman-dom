import { MyFrame } from "../framework/miniframe.js";

export const Waiting = (tabUser) => {
  let counter = 20; // Initialisez le compteur
  let play = false;
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
    { class: "waiting-title" },
    MyFrame.createDomElement(
      "h1",
      { class: "waiting-title-text", id: "waiting-title-text" },
    ),
    ...userList
  );
};
