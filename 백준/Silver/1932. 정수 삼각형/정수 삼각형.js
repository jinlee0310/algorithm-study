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
  const triangle = [];
  const dp = Array.from({ length: n }, (_, idx) => new Array(idx + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    triangle.push(input[i].split(" ").map((v) => Number(v)));
  }
  if (n === 1) {
    console.log(triangle[0][0]);
    return;
  }
  dp[0][0] = triangle[0][0];
  dp[1][0] = triangle[1][0] + dp[0][0];
  dp[1][1] = triangle[1][1] + dp[0][0];
  for (let i = 2; i < n; i++) {
    dp[i][0] = triangle[i][0] + dp[i - 1][0];
    const lastIdx = dp[i].length - 1;
    dp[i][lastIdx] = triangle[i][lastIdx] + dp[i - 1][dp[i - 1].length - 1];
    for (let j = 1; j < triangle[i].length - 1; j++) {
      dp[i][j] = triangle[i][j] + Math.max(dp[i - 1][j - 1], dp[i - 1][j]);
    }
  }
  console.log(Math.max(...dp[dp.length - 1]));
};

solution(input);
