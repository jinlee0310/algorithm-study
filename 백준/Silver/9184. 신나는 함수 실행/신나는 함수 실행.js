const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .trim()
  .split("\n");

const w_memo = (a, b, c) => {
  const dp = Array.from({ length: 21 }, () =>
    Array.from({ length: 21 }, () => Array(21).fill(0)),
  );

  for (let i = 0; i <= 20; i++) {
    for (let j = 0; j <= 20; j++) {
      for (let k = 0; k <= 20; k++) {
        if (i <= 0 || j <= 0 || k <= 0) {
          dp[i][j][k] = 1;
        } else {
          if (i < j && j < k) {
            dp[i][j][k] =
              dp[i][j][k - 1] + dp[i][j - 1][k - 1] - dp[i][j - 1][k];
          } else {
            dp[i][j][k] =
              dp[i - 1][j][k] +
              dp[i - 1][j - 1][k] +
              dp[i - 1][j][k - 1] -
              dp[i - 1][j - 1][k - 1];
          }
        }
      }
    }
  }

  if (a <= 0 || b <= 0 || c <= 0) return 1;
  if (a > 20 || b > 20 || c > 20) return dp[20][20][20];

  return dp[a][b][c];
};

const solution = (input) => {
  const answer = input
    .map((line) => {
      const [a, b, c] = line.split(" ").map(Number);
      return `w(${a}, ${b}, ${c}) = ${w_memo(a, b, c)}`;
    })
    .join("\n");
  console.log(answer);
};

input.pop();
solution(input);
