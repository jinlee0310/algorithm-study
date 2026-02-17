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

const countCycle = (start, graph, visited) => {
  let E = 0;
  let V = 0;

  const queue = [start];
  visited[start] = true;

  while (queue.length) {
    const cur = queue.shift();
    E++;
    for (let node of graph[cur]) {
      V++;
      if (!visited[node]) {
        visited[node] = true;
        queue.push(node);
      }
    }
  }
  return V / 2 - E + 1;
};

const solution = (input) => {
  const [N, M] = input[0].split(" ").map(Number);
  const graph = Array.from({ length: N + 1 }, () => []);
  for (let i = 1; i <= M; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    graph[a].push(b);
    graph[b].push(a);
  }
  const visited = Array(N + 1).fill(false);
  let treeCnt = 0;
  let cycleCnt = 0;
  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      treeCnt++;
      cycleCnt += countCycle(i, graph, visited);
    }
  }
  console.log(treeCnt - 1 + cycleCnt);
};

solution(input);
