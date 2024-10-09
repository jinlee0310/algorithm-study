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
  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(Number(input[i]));
  }
  const dp = Array(n).fill(0);
  dp[0] = arr[0];
  dp[1] = arr[1] + arr[0];
  dp[2] = Math.max(arr[0] + arr[1], arr[1] + arr[2], arr[0] + arr[2]);

  for (let i = 3; i < n; i++) {
    dp[i] = Math.max(
      dp[i - 1],
      dp[i - 2] + arr[i],
      dp[i - 3] + arr[i - 1] + arr[i],
    );
  }
  console.log(dp[n - 1]);
};

solution(input);
