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
  const n = Number(input[0]);
  const scores = [];
  for (let i = 1; i <= n; i++) {
    scores.push(Number(input[i]));
  }
  const dp = new Array(n).fill(0);

  dp[0] = scores[0];
  dp[1] = scores[1] + scores[0];
  dp[2] = scores[2] + Math.max(scores[0], scores[1]);
  for (let i = 3; i < dp.length; i++) {
    dp[i] = Math.max(dp[i - 3] + scores[i - 1], dp[i - 2]) + scores[i];
  }
  console.log(dp[n - 1]);
};

solution(input);
