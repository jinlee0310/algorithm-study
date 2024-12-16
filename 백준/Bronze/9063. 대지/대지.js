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
  const N = Number(input[0]); // 점의 개수
  const points = input.slice(1).map((line) => line.split(" ").map(Number));

  // 초기 최소/최대값 설정
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;

  // 각 점을 순회하며 최소/최대값 갱신
  for (const [x, y] of points) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  // 직사각형의 넓이 계산
  const area = (maxX - minX) * (maxY - minY);
  console.log(area);
};

solution(input);