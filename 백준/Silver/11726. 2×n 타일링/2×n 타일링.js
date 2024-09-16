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
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;
  for (let i = 3; i < dp.length; i++) {
    dp[i] = (dp[i - 1] % 10007) + (dp[i - 2] % 10007);
  }
  console.log(dp[n] % 10007);
};

solution(input);
