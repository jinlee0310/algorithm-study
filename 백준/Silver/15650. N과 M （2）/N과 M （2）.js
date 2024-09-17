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

const combination = (arr, n) => {
  if (n === 1) return arr.map((v) => [v]);

  const answer = [];
  arr.forEach((v, idx, arr) => {
    const rest = [...arr.slice(idx + 1)];
    const combinations = combination(rest, n - 1);
    const attach = combinations.map((combination) => [v, ...combination]);
    answer.push(...attach);
  });

  return answer;
};

const solution = (input) => {
  const [n, m] = input.split(" ").map((v) => Number(v));
  const arr = Array.from({ length: n }, (_, idx) => idx + 1);
  const combinations = combination(arr, m);
  console.log(
    combinations.map((v) => v.sort((a, b) => a - b).join(" ")).join("\n"),
  );
};

solution(input);
