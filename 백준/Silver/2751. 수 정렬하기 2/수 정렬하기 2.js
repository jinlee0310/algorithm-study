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
  const numArr = [];
  for (let i = 1; i <= n; i++) {
    numArr.push(Number(input[i]));
  }
  numArr.sort((a, b) => a - b);
  console.log(numArr.join("\n"));
};

solution(input);
