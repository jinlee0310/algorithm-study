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
  const [n, x] = input[0].split(" ").map((v) => Number(v));
  const numArr = input[1].split(" ").map((v) => Number(v));
  const answer = [];
  for (const num of numArr) {
    if (num < x) answer.push(num);
  }
  console.log(answer.join(" "));
};

solution(input);
