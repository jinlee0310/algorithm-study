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
  const N = Number(input[0]);
  const graph = [];
  for (let i = 1; i <= N; i++) {
    graph.push(input[i].split(" ").map(Number));
  }
  const arr = Array.from({ length: N }, (_, k) => k + 1);
  const combinations = combination(arr.slice(1), N / 2 - 1).map((v) => [
    1,
    ...v,
  ]);

  // console.log(combinations);
  let answer = Infinity;
  for (let start of combinations) {
    const link = [];
    arr.forEach((num) => {
      if (!start.includes(num)) link.push(num);
    });
    const startCombi = combination(start, 2);
    const linkCombi = combination(link, 2);
    let startSum = 0;
    let linkSum = 0;
    startCombi.forEach(([i, j]) => {
      startSum += graph[i - 1][j - 1];
      startSum += graph[j - 1][i - 1];
    });
    linkCombi.forEach(([i, j]) => {
      linkSum += graph[i - 1][j - 1];
      linkSum += graph[j - 1][i - 1];
    });
    answer = Math.min(answer, Math.abs(startSum - linkSum));
  }
  console.log(answer);
};

solution(input);
