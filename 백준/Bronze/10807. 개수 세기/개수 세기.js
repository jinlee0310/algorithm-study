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
  const arr = input[1].split(" ").map(Number);
  const N = Number(input[2]);
  console.log(arr.filter((v) => v === N).length);
};

solution(input);
