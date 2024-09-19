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
  const m = Number(input[1]);
  const dp = Array.from({ length: n }, () => new Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) {
    dp[i][i] = 0;
  }
  for (let i = 0; i < m; i++) {
    const [a, b, c] = input[i + 2].split(" ").map((v) => Number(v));
    dp[a - 1][b - 1] = Math.min(dp[a - 1][b - 1], c);
  }
  // console.log(dp);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        dp[j][k] = Math.min(dp[j][k], dp[j][i] + dp[i][k]);
      }
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (dp[i][j] === Infinity) dp[i][j] = 0;
    }
  }
  console.log(dp.map((v) => v.join(" ")).join("\n"));
};

solution(input);
