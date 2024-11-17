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

const bfs = (graph) => {
  const visited = Array(graph.length + 1).fill(false);
  visited[1] = true;
  let cnt = 0;

  const queue = [[1, 0]];

  while (queue.length) {
    const [cur, depth] = queue.shift();
    if (depth <= 2) cnt++;

    for (let node of graph[cur]) {
      if (!visited[node]) {
        visited[node] = true;
        queue.push([node, depth + 1]);
      }
    }
  }
  return cnt - 1;
};

const solution = (input) => {
  const N = Number(input[0]);
  const M = Number(input[1]);
  const graph = Array.from({ length: N + 1 }, () => []);
  for (let i = 2; i <= M + 1; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    graph[a].push(b);
    graph[b].push(a);
  }
  const cnt = bfs(graph);
  console.log(cnt);
};

solution(input);
