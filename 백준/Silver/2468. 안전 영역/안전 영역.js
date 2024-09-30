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

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const bfs = (graph, visited, start, height) => {
  const queue = [start];
  visited[start[1]][start[0]] = true;

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        0 <= nx &&
        nx < graph.length &&
        0 <= ny &&
        ny < graph.length &&
        !visited[ny][nx] &&
        graph[ny][nx] > height
      ) {
        visited[ny][nx] = true;
        queue.push([nx, ny]);
      }
    }
  }
};

const solution = (input) => {
  const n = Number(input[0]);
  const graph = [];
  let max = 0;
  for (let i = 1; i <= n; i++) {
    const row = input[i].split(" ").map((v) => Number(v));
    graph.push(row);
    max = Math.max(...row, max);
  }
  let answer = 0;
  for (let height = 0; height <= max; height++) {
    let cnt = 0;
    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (graph[j][i] > height && !visited[j][i]) {
          bfs(graph, visited, [i, j], height);
          cnt++;
        }
      }
    }
    answer = Math.max(answer, cnt);
  }
  console.log(answer);
};

solution(input);
