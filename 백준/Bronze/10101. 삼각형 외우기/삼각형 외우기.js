const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const solution = (input) => {
  const [a, b, c] = input;

  // 삼각형의 각도 합
  const sum = a + b + c;

  if (sum !== 180) {
    console.log("Error");
  } else if (a === 60 && b === 60 && c === 60) {
    console.log("Equilateral");
  } else if (a === b || b === c || a === c) {
    console.log("Isosceles");
  } else {
    console.log("Scalene");
  }
};

solution(input);