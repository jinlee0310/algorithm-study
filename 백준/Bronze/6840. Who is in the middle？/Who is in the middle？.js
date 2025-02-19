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
  .split("\n")
  .map(Number);

input.sort((a, b) => a - b); // 오름차순 정렬
console.log(input[1]); // 중간값 출력