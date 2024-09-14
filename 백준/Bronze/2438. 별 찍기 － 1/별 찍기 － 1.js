const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .trim();

const solution = (input) => {
  const n = Number(input);
  for (let i = 1; i <= n; i++) {
    console.log(new Array(i).fill("*").join(""));
  }
};

solution(input);
