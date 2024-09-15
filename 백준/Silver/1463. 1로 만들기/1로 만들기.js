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
  const dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;
  dp[1] = 0;
  for (let i = 2; i < dp.length; i++) {
    const a = i % 2 === 0 ? dp[i / 2] : Infinity;
    const b = i % 3 === 0 ? dp[i / 3] : Infinity;
    dp[i] = Math.min(dp[i - 1], a, b) + 1;
  }
  console.log(dp[n]);
};

solution(input);
