const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .trim();

const solution = (input) => {
  const n = Number(input);
  if (620 <= n && n <= 780) {
    console.log("Red");
  } else if (590 <= n && n < 620) {
    console.log("Orange");
  } else if ((570 <= n) & (n < 590)) {
    console.log("Yellow");
  } else if (495 <= n && n < 570) {
    console.log("Green");
  } else if (450 <= n && n < 495) {
    console.log("Blue");
  } else if (425 <= n && n < 450) {
    console.log("Indigo");
  } else if (380 <= n && n < 425) {
    console.log("Violet");
  }
};

solution(input);
