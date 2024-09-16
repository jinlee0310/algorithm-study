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
  const visited = Array.from({ length: graph.length }, () =>
    new Array(graph[0].length).fill(0),
  );
  visited[0][0] = 1;
  const queue = [[0, 0]];

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        0 <= nx &&
        nx < graph[0].length &&
        0 <= ny &&
        ny < graph.length &&
        visited[ny][nx] === 0 &&
        graph[ny][nx] === 1
      ) {
        visited[ny][nx] = visited[y][x] + 1;
        queue.push([nx, ny]);
      }
    }
  }
  // console.log(visited);
  return visited[visited.length - 1][visited[0].length - 1];
};

const solution = (input) => {
  const [n, m] = input[0].split(" ").map((v) => Number(v));
  const graph = [];
  for (let i = 1; i <= n; i++) {
    graph.push(input[i].split("").map((v) => Number(v)));
  }
  console.log(bfs(graph));
};

solution(input);
