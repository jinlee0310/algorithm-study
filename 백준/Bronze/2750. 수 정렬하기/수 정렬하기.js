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
  const n = Number(input[0]);
  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(Number(input[i]));
  }
  arr.sort((a, b) => a - b);
  console.log(arr.join("\n"));
};

solution(input);
