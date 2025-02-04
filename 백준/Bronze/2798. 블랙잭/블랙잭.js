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

const combination = (arr, n) => {
  if (n === 1) return arr.map((v) => [v]);

  const result = [];
  arr.forEach((v, idx, arr) => {
    const rest = arr.slice(idx + 1);
    const combinations = combination(rest, n - 1);
    const attach = combinations.map((combination) => [v, ...combination]);
    result.push(...attach);
  });
  return result;
};

const solution = (input) => {
  const [N, M] = input[0].split(" ").map(Number);
  const arr = input[1].split(" ").map(Number);

  const combinations = combination(arr, 3);
  let answer = 0;
  let diff = M;
  for (let combination of combinations) {
    const sum = combination.reduce((acc, cur) => acc + cur, 0);
    if (M - sum >= 0 && diff > M - sum) {
      diff = M - sum;
      answer = sum;
    }
  }
  console.log(answer);
};

solution(input);
