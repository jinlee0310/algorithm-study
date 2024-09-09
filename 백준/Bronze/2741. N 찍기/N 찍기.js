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
  const number = Number(input);
  for (let i = 1; i <= number; i++) {
    console.log(i);
  }
};

solution(input);
