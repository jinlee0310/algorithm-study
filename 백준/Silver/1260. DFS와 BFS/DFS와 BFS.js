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

const dfs = (graph, visited, v, route) => {
  visited[v] = true;
  route.push(v);

  for (const node of graph[v]) {
    if (!visited[node]) {
      dfs(graph, visited, node, route);
    }
  }
  return route;
};

const bfs = (graph, v) => {
  const queue = [v];
  const route = [];
  const visited = new Array(graph.length).fill(false);
  visited[v] = true;

  while (queue.length) {
    const cur = queue.shift();
    route.push(cur);

    for (const node of graph[cur]) {
      if (!visited[node]) {
        queue.push(node);
        visited[node] = true;
      }
    }
  }
  return route;
};

const solution = (input) => {
  const [n, m, v] = input[0].split(" ").map((v) => Number(v));
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 1; i <= m; i++) {
    const [node1, node2] = input[i].split(" ").map((v) => Number(v));
    graph[node1].push(node2);
    graph[node2].push(node1);
  }
  graph.forEach((node) => node.sort((a, b) => a - b));
  const visited = new Array(n + 1).fill(false);
  const dfsRoute = dfs(graph, visited, v, []);
  const bfsRoute = bfs(graph, v);
  console.log(dfsRoute.join(" "));
  console.log(bfsRoute.join(" "));
};

solution(input);
