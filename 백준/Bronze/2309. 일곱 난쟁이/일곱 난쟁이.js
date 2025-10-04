const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim()
  .split("\n");

const combination = (arr, n) => {
  if (n === 7) return arr.map((v) => [v]);

  const result = [];
  arr.forEach((v, idx, arr) => {
    const rest = arr.slice(idx + 1);
    const combinations = combination(rest, n + 1);
    const attach = combinations.map((combination) => [...combination, v]);
    result.push(...attach);
  });
  return result;
};

const solution = (input) => {
  const arr = input.map(Number);

  const combinations = combination(arr, 1);
  for (let combination of combinations) {
    const sum = combination.reduce((acc, cur) => acc + cur, 0);
    if (sum === 100) {
      console.log(combination.sort((a, b) => a - b).join("\n"));
      return;
    }
  }
};

solution(input);
