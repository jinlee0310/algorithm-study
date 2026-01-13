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

const bfs = (graph, start) => {
  let cnt = 1;
  const queue = [start];
  const visited = Array(graph.length).fill(false);
  visited[start] = true;

  const order = Array(graph.length).fill(0);
  order[start] = cnt;

  while (queue.length) {
    const now = queue.shift();

    for (let node of graph[now]) {
      if (!visited[node]) {
        visited[node] = true;
        order[node] = ++cnt;
        queue.push(node);
      }
    }
  }
  return order;
};

const solution = (input) => {
  const [N, M, R] = input[0].split(" ").map(Number);
  const graph = Array.from({ length: N + 1 }, () => []);
  for (let i = 1; i <= M; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    graph[a].push(b);
    graph[b].push(a);
  }

  graph.forEach((arr) => arr.sort((a, b) => a - b));
  const order = bfs(graph, R);
  order.shift();
  console.log(order.join("\n"));
};

solution(input);
