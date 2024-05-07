import { readMessageFromServer, sendMessageToServer } from "./utils.js";

export function initializeWebSocket() {
   const socket = new WebSocket('ws://localhost:8080/ws');

   socket.addEventListener('open', (event) => {
      console.log('Connexion établie avec le serveur');
      // Utilisation de la fonction sendMessage
      sendMessageToServer(socket, {
         type: 'login',
         content: 'toto'
      });
   });

   readMessageFromServer(socket, (event) => {
      console.log('Message reçu du serveur:', event.data);
   });

   socket.addEventListener('error', (event) => {
      console.error('Erreur de connexion:', event);
   });

   socket.addEventListener('close', (event) => {
      console.log('Connexion fermée:', event.code, event.reason);
   });
}
// initializeWebSocket();