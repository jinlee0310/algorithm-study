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
  visited[start[0]][start[1]] = true;

  const dr = [1, -1, 0, 0, 1, -1, 1, -1];
  const dc = [0, 0, 1, -1, 1, 1, -1, -1];

  while (queue.length) {
    const [r, c] = queue.shift();

    for (let i = 0; i < 8; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (
        0 <= nr &&
        nr < graph.length &&
        0 <= nc &&
        nc < graph[0].length &&
        graph[nr][nc] === 1 &&
        !visited[nr][nc]
      ) {
        visited[nr][nc] = true;
        queue.push([nr, nc]);
      }
    }
  }
};

const solution = (input) => {
  let lineIdx = 0;
  const answer = [];
  while (lineIdx < input.length) {
    const [w, h] = input[lineIdx].split(" ");
    lineIdx++;
    const graph = [];
    for (let j = 0; j < h; j++) {
      graph.push(input[lineIdx].split(" ").map(Number));
      lineIdx++;
    }
    let cnt = 0;
    const visited = Array.from({ length: h }, () => Array(w).fill(false));
    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        if (graph[r][c] === 1 && !visited[r][c]) {
          bfs(graph, visited, [r, c]);
          cnt++;
        }
      }
    }
    answer.push(cnt);
  }
  console.log(answer.join("\n"));
};

input.pop();
solution(input);
