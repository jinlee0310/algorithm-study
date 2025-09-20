const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim();

const solution = (input) => {
  console.log(
    input
      .split(" ")
      .map(Number)
      .sort((a, b) => a - b)
      .join(" ")
  );
};

solution(input);
