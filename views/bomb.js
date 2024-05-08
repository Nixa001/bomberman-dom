import { MyFrame } from "../framework/miniframe.js";

export function creaBomb() {
    let bomb = MyFrame.createDomElement(
        "div",
        { class: "bomb" },
        MyFrame.createDomElement("img", {
            src: "../views/styles/assets/bomb.png",
        })
    );
    return bomb;
}