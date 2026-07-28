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
  const randomPart = Math.random() * 8;
  const humanPart = Date.now() % 8;
  const combined = Math.floor(randomPart + humanPart) % 16;

  if (combined === 0) return 6;
  if (combined < 8) return 8;
  if (combined < 13) return 7;
  return 9;
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

function hasChangingLines(lines) {
  return lines.some((line) => line.changing === true);
}

function getSecondHexagram() {
  const secondHex = thrownLines.map((line) => {
    if (line.value === 6) return { ...line, value: 7 };
    if (line.value === 9) return { ...line, value: 8 };
    return line;
  });

  const secondThrow = buildHexagram(secondHex);

  return secondThrow;
}

const testLines = [
  { position: 1, value: 9, solid: true, changing: true },
  { position: 2, value: 8, solid: false, changing: false },
  { position: 3, value: 7, solid: true, changing: false },
  { position: 4, value: 7, solid: true, changing: false },
  { position: 5, value: 7, solid: true, changing: false },
  { position: 6, value: 9, solid: true, changing: true },
];

const throwButton = document.getElementById("throw-button");

throwButton.addEventListener("click", handleThrow);

function handleThrow() {
  const value = throwLine();

  thrownLines.push({
    position: currentPosition + 1,
    value: value,
    solid: isSolid(value),
    changing: isChanging(value),
  });

  currentPosition++;

  console.log(thrownLines);

  if (currentPosition === 6) {
    console.log("all lines thrown");
    console.log(buildHexagram(thrownLines));
  }
}
