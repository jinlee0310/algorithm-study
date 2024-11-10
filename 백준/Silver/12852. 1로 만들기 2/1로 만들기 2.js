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
  let n = Number(input[0]);
  const dp = Array(n + 1).fill(0);
  const route = Array(n + 1).fill(0);

  for (let i = 2; i <= n; i++) {
    let minSteps = dp[i - 1];
    let prev = i - 1;

    if (i % 3 === 0 && dp[i / 3] < minSteps) {
      minSteps = dp[i / 3];
      prev = i / 3;
    }

    if (i % 2 === 0 && dp[i / 2] < minSteps) {
      minSteps = dp[i / 2];
      prev = i / 2;
    }

    dp[i] = minSteps + 1;
    route[i] = prev;
  }
  const resultRoute = [];
  for (let i = n; i > 0; i = route[i]) {
    resultRoute.push(i);
  }
  console.log(dp[n]);
  console.log(resultRoute.join(" "));
};
solution(input);
