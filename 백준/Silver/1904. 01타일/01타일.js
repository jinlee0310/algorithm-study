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
  const M = 15746;
  const N = Number(input);
  const dp = Array(N + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;
  for (let i = 3; i <= N; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % M;
  }
  console.log(dp[N]);
};

solution(input);
