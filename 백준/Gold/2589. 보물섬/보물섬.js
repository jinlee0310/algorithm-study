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
  const queue = [start];
  const visited = Array.from({ length: graph.length }, () =>
    Array(graph[0].length).fill(0),
  );
  visited[start[1]][start[0]] = 1;

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  let max = 0;

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
        graph[ny][nx] === "L"
      ) {
        visited[ny][nx] = visited[y][x] + 1;
        max = Math.max(max, visited[ny][nx]);
        queue.push([nx, ny]);
      }
    }
  }
  // console.log(visited);
  return max - 1;
};

const solution = (input) => {
  const [h, w] = input[0].split(" ").map(Number);
  const graph = [];

  for (let i = 1; i <= h; i++) {
    graph.push(input[i].split(""));
  }
  let max = 0;

  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      if (graph[j][i] === "L") {
        const result = bfs(graph, [i, j]);
        max = Math.max(max, result);
      }
    }
  }
  console.log(max);
};

solution(input);
