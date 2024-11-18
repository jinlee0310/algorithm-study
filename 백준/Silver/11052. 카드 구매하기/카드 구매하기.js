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
  const N = Number(input[0]);
  const arr = input[1].split(" ").map(Number);
  arr.unshift(0);

  const dp = Array(N + 1).fill(0);
  dp[1] = arr[1];
  dp[2] = Math.max(arr[2], arr[1] * 2);
  for (let i = 3; i <= N; i++) {
    const cand = [];
    for (let j = i - 1; j >= Math.ceil(i / 2); j--) {
      cand.push(dp[j] + dp[i - j]);
    }
    cand.push(arr[i]);
    dp[i] = Math.max(...cand);
  }
  // console.log(dp);
  console.log(dp[N]);
};

solution(input);
