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

const solution = (input) => {
  const T = Number(input[0]);
  const max = Math.max(...input.slice(1));
  const M = 1000000009;

  const answer = [];

  const dp = Array(max + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 4;
  for (let i = 4; i <= max; i++) {
    dp[i] = (dp[i - 1] % M) + (dp[i - 2] % M) + (dp[i - 3] % M);
  }

  for (let i = 1; i <= T; i++) {
    const n = Number(input[i]);
    answer.push(dp[n] % M);
  }
  console.log(answer.join("\n"));
};

solution(input.map(Number));
