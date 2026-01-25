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

const gcd = (a, b) => {
  while (b !== 0) {
    const r = a % b;
    a = b;
    b = r;
  }
  return Math.abs(a);
};

const getGCD = (arr) => {
  let g = arr[0];
  for (let i = 1; i < arr.length; i++) {
    g = gcd(g, arr[i]);
    if (g === 1) return 1;
  }
  return g;
};

const solution = (input) => {
  const trees = input.slice(1).map(Number);
  const gaps = [];
  for (let i = 1; i < trees.length; i++) {
    gaps.push(trees[i] - trees[i - 1]);
  }
  const gcd = getGCD(gaps);
  const answer = gaps.reduce((prev, cur) => prev + (cur / gcd - 1), 0);
  console.log(answer);
};

solution(input);
