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

const bfs = (graph, visited, start) => {
  const queue = [start];
  visited[start[1]][start[0]] = true;

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  let size = 1;

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
        !visited[ny][nx] &&
        graph[ny][nx] === 0
      ) {
        size++;
        visited[ny][nx] = true;
        queue.push([nx, ny]);
      }
    }
  }
  return size;
};

const solution = (input) => {
  const [n, m, k] = input[0].split(" ").map((v) => Number(v));
  const graph = Array.from({ length: n }, () => Array(m).fill(0));
  for (let i = 1; i <= k; i++) {
    const [x1, y1, x2, y2] = input[i].split(" ").map((v) => Number(v));
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        graph[y][x] = 1;
      }
    }
  }
  const visited = Array.from({ length: n }, () => Array(m).fill(false));
  const sizes = [];
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < m; i++) {
      if (!visited[j][i] && graph[j][i] === 0) {
        sizes.push(bfs(graph, visited, [i, j]));
      }
    }
  }
  console.log(sizes.length);
  console.log(sizes.sort((a, b) => a - b).join(" "));
};

solution(input);
