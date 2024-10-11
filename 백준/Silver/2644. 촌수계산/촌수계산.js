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

const solution = (input) => {
  const n = Number(input[0]);
  const [s, e] = input[1].split(" ").map(Number);
  const m = Number(input[2]);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 3; i <= m + 2; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    graph[a].push(b);
    graph[b].push(a);
  }

  const visited = Array(n + 1).fill(0);
  const bfs = (start) => {
    const queue = [start];

    while (queue.length) {
      const cur = queue.shift();
      if (cur === e) break;

      for (let node of graph[cur]) {
        if (visited[node] === 0) {
          visited[node] = visited[cur] + 1;
          queue.push(node);
        }
      }
    }
  };
  bfs(s);
  console.log(visited[e] === 0 ? -1 : visited[e]);
};

solution(input);
