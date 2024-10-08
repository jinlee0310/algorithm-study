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
const solution = (input) => {
  const n = Number(input);
  const dp = Array(n + 1).fill(0);
  if (n === 1) return 1;
  if (n === 2) return 3;
  if (n === 3) return 5;
  dp[1] = 1;
  dp[2] = 3;
  for (let i = 3; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2] * 2) % 10007;
  }
  return dp[n];
};

console.log(solution(input));
