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
  const arr = input[1].split(" ").map(Number);
  let maxSum = arr[0];
  let currentSum = arr[0];

  for (let i = 1; i < arr.length; i++) {
    // 현재 원소를 더한 값과 현재 원소 중 더 큰 값 선택
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    // 최대 합을 업데이트
    maxSum = Math.max(maxSum, currentSum);
  }

  console.log(maxSum);
};

solution(input);
