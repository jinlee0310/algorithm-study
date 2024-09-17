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
  const T = Number(input[0]);
  const answer = [];
  for (let i = 0; i < T; i++) {
    const n = Number(input[i * 3 + 1]); // 123/456
    const arr = [];
    arr.push(input[i * 3 + 2].split(" ").map((v) => Number(v)));
    arr.push(input[i * 3 + 3].split(" ").map((v) => Number(v)));
    if (n === 1) {
      answer.push(Math.max(arr[0][0], arr[1][0]));
      continue;
    }
    const dp = Array.from({ length: 2 }, () => new Array(n).fill(0));
    dp[0][0] = arr[0][0];
    dp[1][0] = arr[1][0];

    dp[0][1] = dp[1][0] + arr[0][1];
    dp[1][1] = dp[0][0] + arr[1][1];
    for (let j = 2; j < n; j++) {
      dp[0][j] = Math.max(dp[1][j - 2], dp[1][j - 1]) + arr[0][j];
      dp[1][j] = Math.max(dp[0][j - 2], dp[0][j - 1]) + arr[1][j];
    }
    answer.push(Math.max(...dp[0], ...dp[1]));
  }
  console.log(answer.join("\n"));
};

solution(input);
