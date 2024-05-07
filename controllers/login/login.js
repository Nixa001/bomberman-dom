export function handleLogin(event) {
 event.preventDefault(); // Empêche la soumission par défaut
 const inputValue = event.target.elements.inputLogin.value; // Récupère la valeur du champ d'entrée
 console.log(inputValue); 
 let name = document.querySelector(".inputLogin");
 name.value = "";
}
