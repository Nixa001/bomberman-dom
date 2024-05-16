import { playerLive } from "../../controllers/bomb/bomb.js";
import { MyFrame } from "../../framework/miniframe.js";
1
export function gameTime(){
    let time = MyFrame.createDomElement(
        "span",
        {
            class: "time",
            
        },
        "time : 5 seconds" 
    )
    return time
}
export function gameLife(){
    let life = MyFrame.createDomElement(
        "span",
        {
            class: "life",
        },
        "life : " + playerLive
    );
    return life
}
export function gamePlayers(){
    let players = MyFrame.createDomElement(
        "span",
        {
            class: "players",
        },
        "players : 4"
    );
    return players
}
