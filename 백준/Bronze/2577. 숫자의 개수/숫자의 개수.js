const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .split("\n");

const solution = (input) => {
  const [A, B, C] = input.map((v) => Number(v));

  const result = A * B * C;

  const arr = Array(10).fill(0);

  result
    .toString()
    .split("")
    .forEach((v) => arr[v]++);
  console.log(arr.join("\n"));
};

solution(input);
