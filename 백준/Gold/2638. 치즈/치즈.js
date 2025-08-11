const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .split("\n");

const dr = [1, -1, 0, 0];
const dc = [0, 0, 1, -1];

const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;

const resetOutside = (g) => {
  for (let r = 0; r < g.length; r++) {
    for (let c = 0; c < g[0].length; c++) {
      if (g[r][c] === 2) g[r][c] = 0;
    }
  }
};

const bfs = (graph) => {
  const R = graph.length;
  const C = graph[0].length;

  const queue = [[0, 0]];

  while (queue.length) {
    const [r, c] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (isIn(nr, nc, R, C) && graph[nr][nc] === 0) {
        graph[nr][nc] = 2;
        queue.push([nr, nc]);
      }
    }
  }
};

const isMelted = (graph) => {
  const R = graph.length;
  const C = graph[0].length;

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (graph[r][c] === 1) return false;
    }
  }
  return true;
};

const melting = (graph) => {
  const R = graph.length;
  const C = graph[0].length;

  const cand = [];
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (graph[r][c] === 1) {
        let cnt = 0;
        for (let i = 0; i < 4; i++) {
          const nr = r + dr[i];
          const nc = c + dc[i];

          if (isIn(nr, nc, R, C) && graph[nr][nc] === 2) {
            cnt++;
          }
        }
        if (cnt >= 2) cand.push([r, c]);
      }
    }
  }

  cand.forEach(([r, c]) => {
    graph[r][c] = 2;
  });
};

const solution = (input) => {
  const [N, M] = input[0].split(" ").map(Number);
  const graph = input.slice(1).map((row) => row.split(" ").map(Number));

  bfs(graph);

  let cnt = 0;
  while (!isMelted(graph)) {
    melting(graph);
    resetOutside(graph);
    bfs(graph);
    cnt++;
  }

  console.log(cnt);
};

solution(input);
