import hexagrams from "./data/hexagrams";

let thrownLines = [];
let currentPosition = 0;

const trigrams = {
  111: 0, // Ch'ien — Heaven
  "001": 1, // Chên — Thunder
  "010": 2, // K'an — Water
  100: 3, // Kên — Mountain
  "000": 4, // K'un — Earth
  110: 5, // Sun — Wind
  101: 6, // Li — Fire
  "011": 7, // Tui — Lake
};
function throwLine() {
  let line = 0;
  const lineThrow = Math.floor(Math.random() * 16);

  if (lineThrow === 0) {
    line = 6;
  } else if (lineThrow < 8) {
    line = 8;
  } else if (lineThrow < 13) {
    line = 7;
  } else {
    line = 9;
  }

  return line;
}

function isSolid(value) {
  return value === 7 || value === 9;
}

function isChanging(value) {
  return value === 6 || value === 9;
}
