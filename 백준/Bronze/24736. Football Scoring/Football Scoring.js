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
  const dict = [6, 3, 2, 1, 2];
  const scores = [];
  for (let i = 0; i < 2; i++) {
    const score = input[i]
      .split(" ")
      .map((v) => Number(v))
      .map((v, idx) => v * dict[idx])
      .reduce((acc, cur) => acc + cur, 0);
    scores.push(score);
  }
  console.log(scores.join(" "));
};

solution(input);
