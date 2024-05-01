import { MyFrame } from "../framework/miniframe.js";

export function loginInterface() {
  const headingElement = MyFrame.createDomElement(
    "h1",
    { class: "titleLogin" },
    "Welcom to"
  );
  let headingElement2 = MyFrame.createDomElement("div", { class: "titleDiv" });

  const inputElement = MyFrame.createDomElement("input", {
    type: "text",
    class: "inputLogin",
    placeholder: "Your pseudo ...",
  });

  const formElement = MyFrame.createDomElement(
    "form",
    { class: "formDiv" },
    headingElement,
    headingElement2,
    inputElement
  );

  const loginDiv = MyFrame.createDomElement(
    "div",
    { class: "loginDiv" },
    formElement
  );

  return loginDiv;
}
