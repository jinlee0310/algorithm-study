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
  const score = Number(input);
  if (90 <= score) return "A";
  else if (80 <= score) return "B";
  else if (70 <= score) return "C";
  else if (60 <= score) return "D";
  else return "F";
};

console.log(solution(input));
