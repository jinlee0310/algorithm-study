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
  const arr1 = input[1].split(" ").map(Number);
  const arr2 = input[2].split(" ").map(Number);

  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => b - a);

  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += arr1[i] * arr2[i];
  }
  console.log(sum);
};

solution(input);
