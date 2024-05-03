import { MyFrame } from "../../framework/miniframe.js";

export let t = 10
let s = 3
let p = 4

export function gameInfo(){
    let time = MyFrame.createDomElement(
        "span",
        {
            class: "time",

        },
        "time : " + t + " s"
    );
    let life = MyFrame.createDomElement(
        "span",
        {
            class: "life",
        },
        "life : " + s + " life"
    );
    let players = MyFrame.createDomElement(
        "span",
        {
            class: "players",
        },
        "players : " + p + " players"
    );
    let gameInfo = MyFrame.createDomElement(
        "div",
        {
            class: "game-info",
        },
        time,
        life,
        players,
    );
    return gameInfo;
}