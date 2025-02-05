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

const dfs = (arr, cur, visited) => {
  visited[cur] = true;

  const node = arr[cur];
  if (!visited[node]) dfs(arr, node, visited);
};

const solution = (input) => {
  const T = Number(input[0]);
  let lineIdx = 1;
  for (let i = 0; i < T; i++) {
    const N = Number(input[lineIdx]);
    lineIdx++;
    const arr = input[lineIdx].split(" ").map(Number);
    lineIdx++;
    arr.unshift(0);
    const visited = Array(N + 1).fill(false);
    let cnt = 0;
    for (let j = 1; j <= N; j++) {
      if (!visited[j]) {
        dfs(arr, j, visited);
        cnt++;
      }
    }
    console.log(cnt);
  }
};

solution(input);
