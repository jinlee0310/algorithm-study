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

const factorial = (n) => {
  return n ? BigInt(BigInt(n) * BigInt(factorial(n - 1))) : 1;
};

const solution = (input) => {
  const n = Number(input[0]);
  const fArr = [...factorial(n).toString()];
  let answer = 0;
  for (let i = fArr.length - 1; i >= 0; i--) {
    if (fArr[i] === "0") answer++;
    else break;
  }
  console.log(answer);
};

solution(input);
