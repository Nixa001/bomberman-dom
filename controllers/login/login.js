import { sendMessageToServer } from "../socket/utils.js";

let IdPlayer = 0;
export function handleLogin(event) {
    event.preventDefault(); // Empêche la soumission par défaut
    let pseudo = event.target.elements.inputLogin.value; // Récupère la valeur du champ d'entrée

    pseudo = pseudo.trim();
    if (pseudo === "") {
        name.value = "";
        return;
    }

    let inputValue = { id: IdPlayer, pseudo: pseudo }; // Utilise le pseudo sans espaces
    sendMessageToServer({ type: 'login', content: inputValue });
    IdPlayer++;
    let name = document.querySelector(".inputLogin");
    name.value = "";
}