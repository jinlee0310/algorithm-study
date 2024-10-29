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
  const T = Number(input[0]);
  for (let i = 1; i <= T; i++) {
    const [n, x] = input[i].split(" ").map(Number);
    console.log(2 - n + x);
  }
};

solution(input);
