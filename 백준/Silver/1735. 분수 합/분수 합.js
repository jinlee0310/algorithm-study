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

const getGCD = (a, b) => {
  for (let i = Math.min(a, b); i >= 2; i--) {
    if (a % i === 0 && b % i === 0) return i;
  }
  return 1;
};

const solution = (input) => {
  const [A, B] = input[0].split(" ").map(Number);
  const [C, D] = input[1].split(" ").map(Number);

  const gcd = getGCD(B, D);
  const lcm = B * (D / gcd);
  const numerator = (lcm / B) * A + (lcm / D) * C;

  const newGCD = getGCD(numerator, lcm);
  if (newGCD === 1) {
    console.log(`${numerator} ${lcm}`);
  } else {
    console.log(`${numerator / newGCD} ${lcm / newGCD}`);
  }
};

solution(input);
