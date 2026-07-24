import hexagrams from "./data/hexagrams.js";

let thrownLines = [];
let currentPosition = 0;

const trigrams = {
  h111: 0, // Heaven
  h001: 1, // Thunder
  h010: 2, // Water
  h100: 3, // Mountain
  h000: 4, // Earth
  h110: 5, // Wind
  h101: 6, // Fire
  h011: 7, // Lake
};

const hexagramLookup = [
  [1, 34, 5, 26, 11, 9, 14, 43], // lower 0 Heaven
  [25, 51, 3, 27, 24, 42, 21, 17], // lower 1 Thunder
  [6, 40, 29, 4, 7, 59, 64, 47], // lower 2 Water
  [33, 62, 39, 52, 15, 53, 56, 31], // lower 3 Mountain
  [12, 16, 8, 23, 2, 20, 35, 45], // lower 4 Earth
  [44, 32, 48, 18, 46, 57, 50, 28], // lower 5 Wind
  [13, 55, 63, 22, 36, 37, 30, 49], // lower 6 Fire
  [10, 54, 60, 41, 19, 61, 38, 58], // lower 7 Lake
];

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

function buildHexagram(lines) {
  const binary = lines.map((line) => (isSolid(line.value) ? 1 : 0));

  let lowerTri = binary.slice(0, 3);
  let upperTri = binary.slice(3, 6);

  const lowerTriStr = "h" + lowerTri.join("");
  const upperTriStr = "h" + upperTri.join("");

  const lowerTriNum = trigrams[lowerTriStr];
  const upperTriNum = trigrams[upperTriStr];

  const hexNumber = hexagramLookup[upperTriNum][lowerTriNum];

  return hexagrams.find((h) => h.number === hexNumber);
}

const testLines = [
  { position: 1, value: 9, solid: true, changing: true },
  { position: 2, value: 8, solid: false, changing: false },
  { position: 3, value: 7, solid: true, changing: false },
  { position: 4, value: 7, solid: true, changing: false },
  { position: 5, value: 7, solid: true, changing: false },
  { position: 6, value: 9, solid: true, changing: true },
];

console.log(buildHexagram(testLines));
