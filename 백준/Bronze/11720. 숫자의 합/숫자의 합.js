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
  const num = input[1].split("").reduce((acc, cur) => acc + Number(cur), 0);
  console.log(num);
};

solution(input);
