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

const factorial = (n) => {
  if (n === 0) return 1;
  if (n === 1) return n;

  return n * factorial(n - 1);
};

const solution = (input) => {
  const n = Number(input);
  console.log(factorial(n));
};

solution(input);
