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
  .split(" ")
  .map(Number);

const solution = (input) => {
  const [D, H, W] = input;

  // 대각선 비율 계산
  const ratio = Math.sqrt(H ** 2 + W ** 2);

  // 실제 높이와 너비 계산
  const height = Math.floor((D * H) / ratio);
  const width = Math.floor((D * W) / ratio);

  // 결과 출력
  console.log(height, width);
};

solution(input);