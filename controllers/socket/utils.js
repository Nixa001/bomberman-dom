
//fonction pour envoyer des messages vers le server

export function sendMessageToServer(socket, message) {
    socket.send(JSON.stringify(message));
}


//fonction pour recevoir des messages depuis le server

export function readMessageFromServer(socket, callback) {
    socket.addEventListener('message', (event) =>{
        // console.log('Message reçu du serveur:', event);
        callback(event);
    })
}