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
  const answer = [];
  input.forEach((tc) => {
    let [N, B, M] = tc.split(" ").map(Number);
    let year = 0;
    while (N < M) {
      year++;
      N += N * (B / 100);
    }
    answer.push(year);
  });
  console.log(answer.join("\n"));
};

solution(input);
