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
  const graph = Array.from({ length: N + 1 }, () =>
    Array(N + 1).fill(Infinity),
  );
  for (let i = 1; i <= M; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    graph[a][b] = 1;
    graph[b][a] = 1;
  }
  for (let i = 1; i <= N; i++) {
    graph[i][i] = 0;
  }

  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
      }
    }
  }
  const arr = [];
  for (let i = 1; i <= N; i++) {
    let sum = 0;
    for (let j = 1; j <= N; j++) {
      sum += graph[i][j];
    }
    arr.push(sum);
  }
  // console.log(arr);
  const min = Math.min(...arr);
  console.log(arr.findIndex((v) => v === min) + 1);
};

solution(input);
