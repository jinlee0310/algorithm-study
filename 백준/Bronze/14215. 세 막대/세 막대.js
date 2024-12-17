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
  // 세 변의 길이 a, b, c
  let [a, b, c] = input.sort((x, y) => x - y); // 오름차순 정렬

  // 삼각형 조건: 두 변의 합이 나머지 한 변보다 커야 한다
  if (a + b <= c) {
    c = a + b - 1; // 삼각형 조건을 만족하도록 c를 조정
  }

  // 최대 둘레 출력
  const perimeter = a + b + c;
  console.log(perimeter);
};

solution(input);