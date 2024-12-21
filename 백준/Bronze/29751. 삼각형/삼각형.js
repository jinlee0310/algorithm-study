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
  const [W, H] = input;

  // 삼각형 넓이 계산
  const area = (W * H) / 2;

  // 소수점 첫 번째 자리까지 출력
  console.log(area.toFixed(1));
};

solution(input);