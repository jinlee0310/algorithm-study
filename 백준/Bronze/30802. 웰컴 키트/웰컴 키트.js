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
  const arr = input[1].split(" ").map((v) => Number(v));
  const [T, P] = input[2].split(" ").map((v) => Number(v));

  const tCnt = arr
    .map((v) => Math.ceil(v / T))
    .reduce((acc, cur) => acc + cur, 0);
  console.log(tCnt);
  console.log(`${Math.floor(n / P)} ${n % P}`);
};

solution(input);
