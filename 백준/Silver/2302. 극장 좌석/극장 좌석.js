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
  const N = Number(input[0]);
  const M = Number(input[1]);

  const fixed = input.slice(2).map(Number);

  const dp = Array(N + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= N; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  let lastVIP = 0;
  let answer = 1;

  fixed.push(N + 1); // 마지막 계산을 위해 끝 좌석 이후 추가
  for (const vip of fixed) {
    const sectionLength = vip - lastVIP - 1; // VIP 사이의 좌석 구간 길이
    if (sectionLength > 0) {
      answer *= dp[sectionLength]; // 해당 구간의 배치 가짓수 곱하기
    }
    lastVIP = vip; // 마지막 VIP 좌석 갱신
  }
  console.log(answer);
};

solution(input);
