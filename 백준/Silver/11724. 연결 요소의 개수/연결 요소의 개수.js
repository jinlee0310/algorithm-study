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
  visited[v] = true;

  for (const node of graph[v]) {
    if (!visited[node]) {
      dfs(graph, visited, node);
    }
  }
};

const solution = (input) => {
  const [n, m] = input[0].split(" ").map((v) => Number(v));
  const visited = new Array(n + 1).fill(false);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 1; i <= m; i++) {
    const [node1, node2] = input[i].split(" ").map((v) => Number(v));
    graph[node1].push(node2);
    graph[node2].push(node1);
  }
  let cnt = 0;
  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      cnt++;
      dfs(graph, visited, i);
    }
  }
  console.log(cnt);
};

solution(input);
