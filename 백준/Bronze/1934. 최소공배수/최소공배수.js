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

const getGCD = (a, b) => {
  let gcd = 0;
  for (let i = 1; i <= Math.max(a, b); i++) {
    if (a % i === 0 && b % i === 0) {
      gcd = i;
    }
  }
  return gcd;
};

const solution = (input) => {
  const T = Number(input[0]);
  for (let i = 1; i <= T; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    const gcd = getGCD(a, b);
    console.log((a * b) / gcd);
  }
};

solution(input);
