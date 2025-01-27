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

  // 방식 1: 22% 세금
  const method1 = Math.floor(N * 0.78);

  // 방식 2: 80% 소득 + 20% 중 22% 세금
  const method2 = Math.floor(N * 0.956);

  console.log(method1, method2);
};

solution(input);