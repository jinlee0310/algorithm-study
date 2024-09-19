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
  const [n, m] = input[0].split(" ").map((v) => Number(v));
  const numArr = [new Array(n + 1).fill(0)];
  const conditions = [];
  for (let i = 1; i <= n; i++) {
    const arr = input[i].split(" ").map((v) => Number(v));
    arr.unshift(0);
    numArr.push(arr);
  }
  for (let i = 0; i < m; i++) {
    conditions.push(input[i + n + 1].split(" ").map((v) => Number(v)));
  }
  const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = numArr[i][j] + dp[i][j - 1];
    }
  }
  // console.log(dp);
  const answer = [];
  conditions.forEach((condition) => {
    const [x1, y1, x2, y2] = condition;
    let sum = 0;
    for (let i = x1; i <= x2; i++) {
      sum += dp[i][y2] - dp[i][y1 - 1];
    }
    answer.push(sum);
  });
  console.log(answer.join("\n"));
};

solution(input);
