import { sendMessageToServer } from "../socket/utils.js";

let IdPlayer = 0
export function handleLogin(event) {
 event.preventDefault(); // Empêche la soumission par défaut
 const pseudo = event.target.elements.inputLogin.value; // Récupère la valeur du champ d'entrée
//  console.log(pseudo); //

let inputValue = {id:IdPlayer, pseudo: pseudo}
 sendMessageToServer({ type : 'login', content : inputValue})
 IdPlayer++
 localStorage.setItem('pseudo', pseudo)
 localStorage.setItem('id', IdPlayer)
 let name = document.querySelector(".inputLogin");
 name.value = "";
}