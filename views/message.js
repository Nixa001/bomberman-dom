import { MyFrame } from "../framework/miniframe.js";

export function createChatInterface() {
  const chat = MyFrame.createDomElement(
    "div",
    { class: "chatBox" },
    MyFrame.createDomElement(
      "div",
      { class: "chat-title" },
      MyFrame.createDomElement(
          "figure",
        { class: "avatar" },
        MyFrame.createDomElement("img", {
          src: "https://icons8.com/icon/Khf81eSD686C/chat-group",
        })
    ),
    MyFrame.createDomElement("h1", {}, "Chat"),
    ),
    MyFrame.createDomElement(
      "div",
      { class: "messages" },
      MyFrame.createDomElement("div", { class: "messages-content" })
    ),
    MyFrame.createDomElement(
      "div",
      { class: "message-box" },
      MyFrame.createDomElement("textarea", {
        type: "text",
        class: "message-input",
        placeholder: "Type message...",
      }),
      MyFrame.createDomElement(
        "button",
        { type: "submit", class: "message-submit" },
        "Send"
      )
    )
  );

  return chat;
}
