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
  const [n, m] = input[0].split(" ").map((v) => Number(v));
  const numArr = input[1].split(" ").map((v) => Number(v));
  const cumsum = new Array(numArr.length + 1).fill(0);
  numArr.forEach((v, idx) => {
    cumsum[idx + 1] = cumsum[idx] + v;
  });
  const answer = [];
  for (let i = 2; i < m + 2; i++) {
    const [s, e] = input[i].split(" ").map((v) => Number(v));
    answer.push(cumsum[e] - cumsum[s - 1]);
  }
  console.log(answer.join("\n"));
};

solution(input);
