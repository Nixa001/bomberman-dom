import { createMapDom } from "./views/playground.js";

let myMap = createMapDom();
const body = document.querySelector('body');
body.appendChild(myMap);