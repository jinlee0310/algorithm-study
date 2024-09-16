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
  for (let i = 1; i <= n; i++) {
    const number = Number(input[i]);
    const dp = new Array(number + 1).fill(0);
    dp[1] = 1;
    dp[2] = 2;
    dp[3] = 4;
    for (let i = 4; i <= number; i++) {
      dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
    }
    console.log(dp[number]);
  }
};

solution(input);
