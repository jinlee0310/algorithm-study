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
  const [n, m] = input[0].split(" ");
  const numArr = [];
  for (let i = 1; i <= n; i++) {
    numArr.push(Number(input[i]));
  }
  numArr.sort((a, b) => a - b);
  let en = 0,
    min = Infinity;
  for (let st = 0; st < n; st++) {
    while (en < n && numArr[en] - numArr[st] < m) en++;
    if (en >= n) break;
    min = Math.min(numArr[en] - numArr[st], min);
  }
  console.log(min);
};

solution(input);
