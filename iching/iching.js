import hexagrams from "./data/hexagrams";

function throwLine() {
  const line = 0;
  const minCeiled = Math.ceil(0);
  const maxFloored = Math.floor(15);

  const lineThrow = Math.floor(
    Math.random() * (maxFloored - minCeiled + 1) + minCeiled,
  );

  if ((lineThrow = 0)) {
    line = 6;
  } else if (lineThrow > 0 && lineThrow < 8) {
    line = 8;
  } else if (lineThrow > 7 && lineThrow < 13) {
    line = 7;
  } else if (lineThrow > 12 && lineThrow < 16) {
    line = 9;
  }

  return line;
}
