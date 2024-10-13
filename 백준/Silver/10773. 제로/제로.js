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
  const K = Number(input[0]);
  const stack = [];

  for (let i = 1; i <= K; i++) {
    const n = Number(input[i]);
    if (n === 0) {
      stack.pop();
    } else {
      stack.push(n);
    }
  }
  console.log(stack.reduce((acc, cur) => acc + cur, 0));
};

solution(input);
