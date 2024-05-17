import { readMessageFromServer, sendMessageToServer } from "./utils.js";

export let socket
export function initializeWebSocket() {
 socket = new WebSocket('ws://localhost:8080/ws');

   socket.addEventListener('open', (event) => {
      console.log('Connexion établie avec le serveur');
   });


   socket.addEventListener('error', (event) => {
      console.error('Erreur de connexion:', event);
   });

   socket.addEventListener('close', (event) => {
      console.log('Connexion fermée:', event.code, event.reason);
   });
}
