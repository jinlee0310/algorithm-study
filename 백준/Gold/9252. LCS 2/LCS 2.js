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
  const str1 = input[0];
  const str2 = input[1];

  const dp = Array.from({ length: str2.length + 1 }, () =>
    Array(str1.length + 1).fill(0),
  );

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str1[j - 1] === str2[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const str = [];
  let i = str2.length,
    j = str1.length;
  while (i > 0 && j > 0) {
    if (dp[i][j] === dp[i - 1][j]) i--;
    else if (dp[i][j] === dp[i][j - 1]) j--;
    else {
      str.push(str2[i - 1]);
      i--;
      j--;
    }
  }

  const answer = [];
  answer.push(dp[str2.length][str1.length]);
  if (answer[0] !== 0) answer.push(str.reverse().join(""));
  console.log(answer.join("\n"));
};

solution(input);
