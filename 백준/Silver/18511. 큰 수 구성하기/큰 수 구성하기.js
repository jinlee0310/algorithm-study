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
  const [N, kSize] = input[0].split(" ").map(Number);
  const K = input[1].split(" ").map(Number);

  let maxResult = 0;

  const dfs = (current) => {
    if (current > N) return;
    maxResult = Math.max(maxResult, current);

    for (let i = 0; i < K.length; i++) {
      dfs(current * 10 + K[i]);
    }
  };

  dfs(0);
  console.log(maxResult);
};

solution(input);