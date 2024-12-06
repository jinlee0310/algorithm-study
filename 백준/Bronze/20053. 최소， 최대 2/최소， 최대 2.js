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

const T = Number(input[0]);
let lineIdx = 1;
const answer = [];

for (let i = 0; i < T; i++) {
  const N = Number(input[lineIdx]);
  const arr = input[lineIdx + 1]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);
  answer.push(`${arr[0]} ${arr[N - 1]}`);
  lineIdx += 2;
}

console.log(answer.join("\n"));
