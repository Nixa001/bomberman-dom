import { handleMessage } from "../controllers/message/messageController.js";
import { MyFrame } from "../framework/miniframe.js";
import { creaBomb } from "./bomb.js";


export function createChatInterface() {
  const chatTitle = MyFrame.createDomElement(
      "div",
      { class: "chat-title" },
      MyFrame.createDomElement(
        "figure",
        { class: "avatar" },
        MyFrame.createDomElement("img", {
          src: "../views/styles/assets/message-circle.svg",
        })
      ),
      MyFrame.createDomElement("h1", {}, "Chat")
    )
  return chatTitle;
}

export function messageContent() {
  let message = MyFrame.createDomElement(
    "div",
    { class: "messages" },
  )
  return message;
}

export function messageBox() {
  let messageBox = MyFrame.createDomElement(
    "div",
    { class: "message-box" },
    MyFrame.createDomElement("textarea", {
      type: "text",
      class: "message-input",
      placeholder: "Type message...",
    }),
    MyFrame.createDomElement(
      "button",
      {
        type: "submit",
        class: "message-submit",
        onClick: handleMessage
      },
      "Send"
    )
  )
  return messageBox;
}