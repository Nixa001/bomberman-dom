import { sendMessageToServer } from "../socket/utils.js";

export function handleMessage(event) {
  let message = document.querySelector(".message-input").value;
  let sender = localStorage.getItem("pseudo");
  let messageObj = { sender: sender, message: message };
  sendMessageToServer({ type: "message", content: messageObj });
  console.log("message sent", message, " de ", sender);
  document.querySelector(".message-input").value = "";
}
