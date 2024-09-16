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
  const numArr = input[1].split(" ").map((v) => Number(v));

  const sumArr = new Array(n).fill(0);
  numArr.sort((a, b) => a - b);
  numArr.forEach((v, idx) => {
    if (idx === 0) {
      sumArr[idx] = v;
    } else {
      sumArr[idx] = sumArr[idx - 1] + v;
    }
  });
  console.log(sumArr.reduce((acc, cur) => acc + cur, 0));
};

solution(input);
