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

const getGCD = (n, m) => {
  for (let i = Math.min(n, m); i >= 1; i--) {
    if (n % i === 0 && m % i === 0) return i;
  }
};

const solution = (input) => {
  const [n, m] = input.split(" ").map((v) => Number(v));
  const gcd = getGCD(n, m);
  const lcm = (n * m) / gcd;
  console.log(gcd);
  console.log(lcm);
};

solution(input);
