const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .trim();

const solution = (input) => {
  const [K, N, M] = input.split(" ").map(Number);
  const rest = K * N - M;
  console.log(rest >= 0 ? rest : 0);
};

solution(input);
