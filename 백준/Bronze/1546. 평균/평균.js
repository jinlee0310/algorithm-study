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
  const arr = input[1].split(" ").map(Number);

  const max = Math.max(...arr);
  const avg =
    arr.map((v) => (v / max) * 100).reduce((acc, cur) => acc + cur, 0) / N;
  console.log(avg);
};

solution(input);
