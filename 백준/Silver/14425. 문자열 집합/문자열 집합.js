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
  const [N, M] = input[0].split(" ").map(Number);
  const s = new Set();

  for (let i = 1; i <= N; i++) {
    s.add(input[i]);
  }
  let cnt = 0;
  for (let i = N + 1; i <= N + M; i++) {
    if (s.has(input[i])) cnt++;
  }
  console.log(cnt);
};

solution(input);
