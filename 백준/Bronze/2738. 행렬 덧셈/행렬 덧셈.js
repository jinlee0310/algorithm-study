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
  const A = input.slice(1, N + 1).map((row) => row.split(" ").map(Number));
  const B = input.slice(N + 1).map((row) => row.split(" ").map(Number));

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      A[r][c] += B[r][c];
    }
  }
  console.log(A.map((row) => row.join(" ")).join("\n"));
};

solution(input);
