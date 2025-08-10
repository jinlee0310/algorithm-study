const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim()
  .split("\n");

const bfs = (graph, start) => {
  const visited = Array(graph.length).fill(false);
  const queue = [start];
  const dists = Array(graph.length).fill(-1);
  visited[start] = true;
  dists[start] = 0;

  while (queue.length) {
    const cur = queue.shift();

    for (let node of graph[cur]) {
      if (!visited[node]) {
        dists[node] = dists[cur] + 1;
        visited[node] = true;
        queue.push(node);
      }
    }
  }
  return dists;
};

const solution = (input) => {
  const [n, m, k, x] = input[0].split(" ").map(Number);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 1; i <= m; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    graph[a].push(b);
  }

  const dists = bfs(graph, x);

  const answer = [];
  for (let i = 1; i < dists.length; i++) {
    if (dists[i] === k) answer.push(i);
  }
  if (answer.length > 0) {
    console.log(answer.join("\n"));
  } else {
    console.log(-1);
  }
};

solution(input);
