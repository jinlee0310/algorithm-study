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
  const results = [];

  for (let i = 1; i <= n; i++) {
    const [a, b, c] = input[i].split(" ").map(Number);

    // 세 변 정렬 (a, b, c 중 가장 큰 값이 빗변)
    const [x, y, z] = [a, b, c].sort((a, b) => a - b);

    // 피타고라스의 정리 확인
    const isRightTriangle = x ** 2 + y ** 2 === z ** 2;

    // 결과 저장
    results.push(`Scenario #${i}:`);
    results.push(isRightTriangle ? "yes" : "no");
    results.push("");  // 빈 줄
  }

  console.log(results.join("\n"));
};

solution(input);