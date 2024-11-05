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

const getNumber = (n) => {
  const dp = Array(n + 1).fill(0);
  dp[1] = 1;
  dp[2] = 1;
  dp[3] = 1;
  dp[4] = 2;
  dp[5] = 2;
  for (let i = 6; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 5];
  }
  return dp[n];
};

const solution = (input) => {
  const T = Number(input[0]);
  for (let i = 1; i <= T; i++) {
    console.log(getNumber(Number(input[i])));
  }
};

solution(input);
