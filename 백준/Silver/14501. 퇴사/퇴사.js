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

const solution = (N, consultations) => {
  const dp = Array(N + 1).fill(0);

  for (let i = 1; i <= N; i++) {
    const [T, P] = consultations[i - 1];

    // 상담을 하지 않는 경우 (이전 날의 최대 수익을 그대로 가져옵니다)
    dp[i] = Math.max(dp[i], dp[i - 1]);

    // 상담을 하는 경우 (기간 안에 상담이 끝나는 경우만 계산)
    if (i + T - 1 <= N) {
      dp[i + T - 1] = Math.max(dp[i + T - 1], dp[i - 1] + P);
    }
    // console.log(dp);
  }

  // return dp[N];
  console.log(dp[N]);
};

solution(
  Number(input[0]),
  input.slice(1).map((v) => v.split(" ").map(Number)),
);
