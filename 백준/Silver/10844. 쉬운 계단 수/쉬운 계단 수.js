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
  const N = Number(input);
  const dp = Array.from({ length: N + 1 }, () => Array(10).fill(0));
  for (let i = 1; i < 10; i++) {
    dp[1][i] = 1;
  }
  const M = 1000000000;
  for (let i = 2; i <= N; i++) {
    for (let j = 0; j < 10; j++) {
      if (j === 0) {
        dp[i][j] = dp[i - 1][1] % M;
      } else if (j === 9) {
        dp[i][j] = dp[i - 1][8] % M;
      } else {
        dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j + 1]) % M;
      }
    }
  }
  console.log(dp[N].reduce((acc, cur) => acc + cur) % M);
};

solution(input);
