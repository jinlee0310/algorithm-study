const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .trim()
  .split("\n");

const factorial = (n) => {
  if (n === BigInt(0)) return BigInt(1);
  return n * factorial(n - BigInt(1));
};

const solution = (input) => {
  const n = Number(input[0]);
  const anwer = [];
  for (let i = 1; i <= n; i++) {
    const [n, m] = input[i].split(" ").map(BigInt);
    const ans = factorial(m) / (factorial(m - n) * factorial(n));
    anwer.push(ans.toString());
  }
  console.log(anwer.join("\n"));
};

solution(input);
