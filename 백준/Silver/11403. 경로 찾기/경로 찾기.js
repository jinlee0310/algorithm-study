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

const dfs = (graph, visited, cur, target) => {
  visited[cur] = true;

  for (const node of graph[cur]) {
    if (node === target) return true;
    if (!visited[node]) {
      if (dfs(graph, visited, node, target)) {
        return true;
      }
    }
  }
  return false;
};

const solution = (input) => {
  const N = Number(input[0]);
  const graph = Array.from({ length: N }, () => []);
  for (let i = 1; i <= N; i++) {
    const arr = input[i].split(" ").map(Number);
    for (let j = 0; j < N; j++) {
      if (arr[j] === 1) {
        graph[i - 1].push(j);
      }
    }
  }
  // console.log(graph);
  const answer = Array.from({ length: N }, () => Array(N).fill(0));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const visited = Array(N).fill(false);
      if (dfs(graph, visited, i, j)) {
        answer[i][j] = 1;
      }
    }
  }
  console.log(answer.map((v) => v.join(" ")).join("\n"));
};

solution(input);
