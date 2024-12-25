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

const dfs = (graph) => {
  const stack = [1];
  const visited = Array(graph.length).fill(false);
  const parents = Array(graph.length);

  while (stack.length) {
    const cur = stack.pop();
    visited[cur] = true;

    for (let node of graph[cur]) {
      if (!visited[node]) {
        parents[node] = cur;
        stack.push(node);
      }
    }
  }
  return parents;
};

const solution = (input) => {
  const n = Number(input[0]);

  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 1; i < input.length; i++) {
    const [node1, node2] = input[i].split(" ").map(Number);
    graph[node1].push(node2);
    graph[node2].push(node1);
  }

  const parents = dfs(graph).filter((_, idx) => idx > 1);
  console.log(parents.join("\n"));
};

solution(input);
