
//fonction pour envoyer des messages vers le server

import { socket } from "./websocket.js";

// const socket = new WebSocket('ws://localhost:8080/ws');
export function sendMessageToServer(message) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        console.log("Envoie du message");
        socket.send(JSON.stringify(message));
      } else {
        console.error("WebSocket is not open");
      }
}


//fonction pour recevoir des messages depuis le server

export function readMessageFromServer(callback) {
    socket.addEventListener('message', (event) =>{
        // console.log('Message reçu du serveur:', event);
        callback(event);
    })
}