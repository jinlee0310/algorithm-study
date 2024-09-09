const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString();

const solution = (input) => {
  const sugar = Number(input);
  const dp = new Array(sugar + 1).fill(Infinity);
  dp[3] = 1;
  dp[5] = 1;
  for (let i = 6; i < dp.length; i++) {
    dp[i] = Math.min(dp[i - 3], dp[i - 5]) + 1;
  }
  return dp[sugar] === Infinity ? -1 : dp[sugar];
};

const answer = solution(input);
console.log(answer);
