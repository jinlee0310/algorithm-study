const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim()
  .split("\n");

const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c <= C;
const dr = [1, -1, 0, 0];
const dc = [0, 0, 1, -1];

const maskingIsland = (graph) => {
  const N = graph.length;

  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  let island = 1;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (graph[r][c] === 1 && !visited[r][c]) {
        island++;
        const queue = [[r, c]];
        visited[r][c] = true;
        graph[r][c] = island;

        while (queue.length) {
          const [r, c] = queue.shift();

          for (let i = 0; i < 4; i++) {
            const nr = r + dr[i];
            const nc = c + dc[i];

            if (isIn(nr, nc, N, N) && !visited[nr][nc] && graph[nr][nc] === 1) {
              queue.push([nr, nc]);
              graph[nr][nc] = island;
              visited[nr][nc] = true;
            }
          }
        }
      }
    }
  }
};

const bfs = (graph, start, island) => {
  const N = graph.length;

  const dists = Array.from({ length: N }, () => Array(N).fill(0));

  const queue = [start];
  while (queue.length) {
    const [r, c] = queue.shift();
    if (graph[r][c] !== 0 && graph[r][c] !== island) {
      return dists[r][c];
    }

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (
        isIn(nr, nc, N, N) &&
        graph[nr][nc] !== island &&
        dists[nr][nc] === 0
      ) {
        dists[nr][nc] = dists[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }
  return Infinity;
};

const solution = (input) => {
  const N = Number(input[0]);
  const graph = input.slice(1).map((v) => v.split(" ").map(Number));

  maskingIsland(graph);
  let bridgeLength = Infinity;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (graph[r][c] !== 0) {
        let flag = false;
        for (let i = 0; i < 4; i++) {
          const nr = r + dr[i];
          const nc = c + dc[i];

          if (isIn(nr, nc, N, N) && graph[nr][nc] === 0) flag = true;
        }
        if (flag) {
          const length = bfs(graph, [r, c], graph[r][c]);
          bridgeLength = Math.min(length - 1, bridgeLength);
        }
      }
    }
  }

  console.log(bridgeLength);
};

solution(input);
