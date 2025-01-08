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
  const X = Number(input[0]);
  const N = Number(input[1]);
  let sum = 0;
  for (let i = 2; i < N + 2; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    sum += a * b;
  }
  console.log(X === sum ? "Yes" : "No");
};

solution(input);
