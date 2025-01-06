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

const findSum = (n) => {
  const dp = Array(100001).fill(0);
  for (let i = 1; i < dp.length; i++) {
    dp[i] = (i * (i + 1)) / 2;
    if (dp[i - 1] <= n && n <= dp[i]) return [i, dp[i - 1] + 1];
  }
};

const solution = (input) => {
  const X = Number(input);
  // console.log(10000000);

  let [n, st] = findSum(X); // 숫자 총 5개
  // console.log(n, st);
  let answer = "";
  if (n % 2 === 1) {
    let i = n,
      j = 1;
    while (st !== X) {
      i--;
      j++;
      st++;
    }
    answer = `${i}/${j}`;
  } else {
    let i = 1,
      j = n;
    while (st !== X) {
      i++;
      j--;
      st++;
    }
    answer = `${i}/${j}`;
  }
  console.log(answer);
};

solution(input);
