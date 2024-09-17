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

const permutation = (arr, n) => {
  const answer = [];
  if (n === 1) return arr.map((v) => [v]);

  arr.forEach((v, idx, arr) => {
    const rest = [...arr.slice(0, idx), ...arr.slice(idx + 1)];
    const permutations = permutation(rest, n - 1);
    const attach = permutations.map((permutation) => [v, ...permutation]);
    answer.push(...attach);
  });

  return answer;
};

const solution = (input) => {
  const [n, m] = input[0].split(" ").map((v) => Number(v));
  const arr = input[1]
    .split(" ")
    .map((v) => Number(v))
    .sort((a, b) => a - b);

  const permutations = permutation(arr, m);
  const set = new Set(permutations.map((v) => v.join(" ")));
  console.log(Array.from(set).join("\n"));
};

solution(input);
