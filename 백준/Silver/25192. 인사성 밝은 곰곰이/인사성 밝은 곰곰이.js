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

const solution = (input) => {
  const N = Number(input[0]);
  let s;

  let answer = 0;
  for (let i = 1; i <= N; i++) {
    if (input[i] === "ENTER") {
      s = new Set();
    } else {
      const nickname = input[i];
      if (!s.has(nickname)) {
        answer++;
        s.add(nickname);
      }
    }
  }
  console.log(answer);
};

solution(input);
