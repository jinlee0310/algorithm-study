const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const isPrime = (n) => {
  if (n === 1) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
};

const solution = (input) => {
  const [a, b] = input;

  let sum = 0;
  let min = Infinity;
  for (let i = a; i <= b; i++) {
    if (isPrime(i)) {
      sum += i;
      min = Math.min(min, i);
    }
  }
  if (sum === 0) return -1;
  else return [sum, min].join("\n");
};

const answer = solution(input);

console.log(answer);
