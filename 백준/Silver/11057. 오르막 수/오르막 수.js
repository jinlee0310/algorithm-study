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

  const dp = Array.from({ length: n + 1 }, () => Array(10).fill(0));
  for (let j = 0; j <= 9; j++) {
    dp[1][j] = 1;
  }

  for (let i = 2; i <= n; i++) {
    for (let j = 0; j <= 9; j++) {
      for (let k = 0; k <= j; k++) {
        dp[i][j] += dp[i - 1][k] % 10007;
      }
    }
  }
  let answer = 0;
  for (let j = 0; j <= 9; j++) {
    answer += dp[n][j];
  }
  console.log(answer % 10007);
};

solution(input);
