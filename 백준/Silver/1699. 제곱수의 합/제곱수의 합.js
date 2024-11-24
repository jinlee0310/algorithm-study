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
  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0; // 0은 0개 항으로 표현 가능

  // 가능한 모든 제곱수를 계산
  const squares = [];
  for (let i = 1; i * i <= n; i++) {
    squares.push(i * i);
  }

  // DP를 이용하여 최소 항의 개수를 계산
  for (let i = 1; i <= n; i++) {
    for (const square of squares) {
      if (i < square) break; // i보다 큰 제곱수는 무시
      dp[i] = Math.min(dp[i], dp[i - square] + 1);
    }
  }
  console.log(dp[n]);
};

solution(input);
