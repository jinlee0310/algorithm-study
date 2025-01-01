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
  const N = Number(input[0]);
  const a = input[1].split(" ").map(Number);
  const b = input[2].split(" ").map(Number);

  let totalMoves = 0;

  for (let i = 0; i < N; i++) {
    totalMoves += Math.abs(a[i] - b[i]);
  }

  console.log(totalMoves / 2);
};

solution(input);