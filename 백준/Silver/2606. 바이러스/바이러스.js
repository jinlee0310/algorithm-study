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

const dfs = (graph, visited, v) => {
  let cnt = 1;
  visited[v] = true;

  for (const node of graph[v]) {
    if (!visited[node]) {
      cnt += dfs(graph, visited, node);
    }
  }
  return cnt;
};

const solution = (input) => {
  const n = Number(input[0]);
  const m = Number(input[1]);
  const graph = Array.from({ length: n + 1 }, () => []);

  for (let i = 2; i <= m + 1; i++) {
    const [node1, node2] = input[i].split(" ").map((v) => Number(v));
    graph[node1].push(node2);
    graph[node2].push(node1);
  }

  const visited = new Array(n + 1).fill(false);
  console.log(dfs(graph, visited, 1) - 1);
};

solution(input);
