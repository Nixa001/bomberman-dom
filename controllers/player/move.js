export const movePlayer = (joueur, x, y) => {
   joueur.style.transform = `translate(${x}px, ${y}px)`;
}