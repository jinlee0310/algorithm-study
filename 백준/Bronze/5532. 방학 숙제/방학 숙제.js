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

const solution = (input) => {
  const [L, A, B, C, D] = input;

  // 국어, 수학 숙제 일수 계산 (올림 처리)
  const koreanDays = Math.ceil(A / C);
  const mathDays = Math.ceil(B / D);

  // 숙제에 필요한 최대 일수
  const studyDays = Math.max(koreanDays, mathDays);

  // 남은 방학 일수
  const remainingDays = L - studyDays;

  console.log(remainingDays);
};

solution(input);