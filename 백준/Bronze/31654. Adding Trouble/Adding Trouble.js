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
  const [a, b, c] = input.split(" ").map((v) => Number(v));
  if (a + b === c) console.log("correct!");
  else console.log("wrong!");
};

solution(input);
