const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim()
  .split("\n");

const [A1, O1] = input[0].split(" ").map(Number); // 첫 번째 바구니: A1(사과), O1(오렌지)
const [A2, O2] = input[1].split(" ").map(Number); // 두 번째 바구니: A2(사과), O2(오렌지)

// 두 가지 이동 방식 중 최소 이동 횟수를 계산
const result = Math.min(A1 + O2, A2 + O1);
console.log(result);