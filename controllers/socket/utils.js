import { socket } from "./websocket.js";

export function sendMessageToServer(message) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error("WebSocket is not open");
  }
}

//fonction pour recevoir des messages depuis le server

export function readMessageFromServer(callback) {
  socket.addEventListener("message", (event) => {
    callback(event);
  });
}
