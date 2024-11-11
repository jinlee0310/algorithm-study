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
  const n = Number(input);
  const dp = Array.from({ length: 2 }, () => Array(n + 1).fill(0));
  dp[1][1] = 1;
  dp[0][2] = 1;

  dp[0][3] = 1;
  dp[1][3] = 1;
  for (let i = 4; i <= n; i++) {
    dp[0][i] = BigInt(dp[0][i - 1] + dp[1][i - 1]);
    dp[1][i] = BigInt(dp[0][i - 1]);
  }
  // console.log(dp);
  console.log((dp[0][n] + dp[1][n]).toString());
};

solution(input);
