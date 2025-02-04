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
  const N = Number(input);
  let answer = 0;
  for (let i = 1; i < N; i++) {
    let sum = i;
    let num = i;
    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    if (sum === N) {
      answer = i;
      break;
    }
  }
  console.log(answer);
};

solution(input);
