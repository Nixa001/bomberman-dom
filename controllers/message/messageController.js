import { getDataFromLocalStorage } from "../../index.js";
import { sendMessageToServer } from "../socket/utils.js";

export function handleMessage(event) {
  event.preventDefault();

  let message = document.querySelector(".message-input").value;
  if (message != "" && message.trim().length > 0) {
    let sender = getDataFromLocalStorage();
    console.log("sending message", sender);
    let messageObj = { sender: sender.pseudo, message: message };
    sendMessageToServer({ type: "message", content: messageObj });
    document.querySelector(".message-input").value = "";

  }else{
    
    document.querySelector(".message-input").value = "";
  }
}
