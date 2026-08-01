import hexagrams from "./data/hexagrams.js";

let thrownLines = [];
let currentPosition = 0;

const trigrams = {
  h111: 0, // Heaven
  h100: 1, // Thunder
  h010: 2, // Water
  h001: 3, // Mountain
  h000: 4, // Earth
  h011: 5, // Wind
  h101: 6, // Fire
  h110: 7, // Lake
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
  console.log(lowerTri);
  console.log(upperTri);
  const lowerTriStr = "h" + lowerTri.join("");
  const upperTriStr = "h" + upperTri.join("");

  const lowerTriNum = trigrams[lowerTriStr];
  const upperTriNum = trigrams[upperTriStr];

  const hexNumber = hexagramLookup[lowerTriNum][upperTriNum];

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
document
  .getElementById("second-reading-button")
  .addEventListener("click", displaySecondReading);

function displayReading() {
  const hexagram = buildHexagram(thrownLines);

  document.getElementById("hex-number").textContent = hexagram.number;
  document.getElementById("hex-name").textContent = hexagram.englishName;
  document.getElementById("hex-description").textContent = hexagram.description;
  document.getElementById("judgment-text").textContent = hexagram.judgment;
  document.getElementById("judgment-commentary").textContent =
    hexagram.judgmentCommentary;
  document.getElementById("image-text").textContent = hexagram.image;
  document.getElementById("image-commentary").textContent =
    hexagram.imageCommentary;

  if (hasChangingLines(thrownLines)) {
    document.getElementById("second-reading-button").style.display = "block";
    const changingLines = thrownLines.filter((line) => line.changing === true);
    const changingLineReading = changingLines.map((line) =>
      hexagram.lines.find((l) => l.position === line.position),
    );

    const changingHTML = changingLineReading
      .map(
        (el) => `
    <h4>${el.title}</h4>
    <p>${el.text}</p>
    <p>${el.commentary}</p>`,
      )
      .join("");

    document.getElementById("changing-lines").innerHTML = changingHTML;
  }
}

function handleThrow() {
  if (currentPosition === 0) {
    document.getElementById("intro").classList.add("hidden");
  }
  const value = throwLine();

  const lineObj = {
    position: currentPosition + 1,
    value: value,
    solid: isSolid(value),
    changing: isChanging(value),
  };

  thrownLines.push(lineObj);
  currentPosition++;

  renderLine(lineObj);

  if (currentPosition === 6) {
    throwButton.disabled = true;
    displayReading();
  }
}

function renderLine(lineObj) {
  const lineRender = document.getElementById("line-" + lineObj.position);
  if (lineObj.solid) {
    lineRender.innerHTML = `<span class="value">${lineObj.value}</span><span class="bar"></span>`;
  } else {
    lineRender.innerHTML = `<span class="value">${lineObj.value}</span>
    <span class="bars">
      <span class="bar left"></span>
      <span class="bar right"></span>
    </span>  
      `;
  }
}

function displaySecondReading() {
  const secondHexagram = getSecondHexagram(thrownLines);
  document.getElementById("second-hex-number").textContent =
    secondHexagram.number;
  document.getElementById("second-hex-name").textContent =
    secondHexagram.englishName;
  document.getElementById("second-hex-description").textContent =
    secondHexagram.description;
  document.getElementById("second-judgment-text").textContent =
    secondHexagram.judgment;
  document.getElementById("second-judgment-commentary").textContent =
    secondHexagram.judgmentCommentary;
  document.getElementById("second-image-text").textContent =
    secondHexagram.image;
  document.getElementById("second-image-commentary").textContent =
    secondHexagram.imageCommentary;
}
