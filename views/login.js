import { handleLogin } from "../controllers/login/login.js";
import { MyFrame } from "../framework/miniframe.js";

export function loginInterface() {
  const headingElement = MyFrame.createDomElement(
    "h1",
    { class: "titleLogin" },
    "Let's play to"
  );
  let headingElement2 = MyFrame.createDomElement("div", { class: "titleDiv" });

  const inputElement = MyFrame.createDomElement("input", {
    type: "text",
    class: "inputLogin",
    name : "inputLogin",
    placeholder: "Your pseudo ...",
  });

  const formElement = MyFrame.createDomElement(
    "form",
    { class: "formDiv",
    onSubmit : handleLogin
  },
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
