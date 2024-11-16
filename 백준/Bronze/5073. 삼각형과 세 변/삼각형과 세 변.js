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
  .split("\n");

const solution = (input) => {
  for (let i = 0; i < input.length; i++) {
    const [a, b, c] = input[i]
      .split(" ")
      .map(Number)
      .sort((a, b) => b - a);
    if (a >= b + c) {
      console.log("Invalid");
      continue;
    }
    if (a === b && b === c) {
      console.log("Equilateral");
    } else if (a === b || b === c || c === a) {
      console.log("Isosceles");
    } else if (a !== b && b !== c && c !== a) {
      console.log("Scalene");
    }
  }
};

input.pop();
solution(input);
