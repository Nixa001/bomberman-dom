export let mapInit = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0],
  [0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 0],
  [0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 0],
  [0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 0],
  [0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 0],
  [0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 0],
  [0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
// export let map = mapInit;
export let players = [];
export let startPos = [
  {
    x: 1,
    y: 1,
  },
  {
    x: 15,
    y: 9,
  },
  {
    x: 15,
    y: 1,
  },
  {
    x: 1,
    y: 9,
  },
];
export let messages = [];
export const CELL_SIZE = 60;
export const MAP_SIZEX = mapInit.length;
export const MAP_SIZEY = mapInit[1].length;
export let color = {
  white: "#fcfefd",
  yellow: "#f2b228",
  black: "#29282d",
  blue: "#5d56a7",
};
