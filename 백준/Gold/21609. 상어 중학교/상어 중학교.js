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

const dr = [1, -1, 0, 0];
const dc = [0, 0, 1, -1];

const bfs = (graph, start, color) => {
  const N = graph.length;
  const [startR, startC] = start;

  let area = 1;
  let rainbowBlock = 0;
  const areaCoords = [start];
  const queue = [start];
  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  visited[startR][startC] = true;

  while (queue.length) {
    const [r, c] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (
        0 <= nr &&
        nr < N &&
        0 <= nc &&
        nc < N &&
        (graph[nr][nc] === color || graph[nr][nc] === 0) &&
        !visited[nr][nc]
      ) {
        visited[nr][nc] = true;
        areaCoords.push([nr, nc]);
        queue.push([nr, nc]);
        area++;
        if (graph[nr][nc] === 0) rainbowBlock++;
      }
    }
  }
  areaCoords.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  let standard = [];
  for (let [r, c] of areaCoords) {
    if (graph[r][c] !== 0) {
      standard = [r, c];
      break;
    }
  }
  return { area, rainbowBlock, areaCoords, standard };
};

const findBiggestBlock = (graph, N) => {
  let max = 0;
  let candidate = [];

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (graph[r][c] > 0) {
        const { area, rainbowBlock, areaCoords, standard } = bfs(
          graph,
          [r, c],
          graph[r][c],
        );
        if (area > max) {
          max = area;
          candidate = [
            {
              pos: [r, c],
              blockColor: graph[r][c],
              rainbowBlock,
              areaCoords,
              standard,
            },
          ];
        } else if (area === max) {
          candidate.push({
            pos: [r, c],
            blockColor: graph[r][c],
            rainbowBlock,
            areaCoords,
            standard,
          });
        }
      }
    }
  }

  if (candidate.length > 1) {
    candidate.sort(
      (a, b) =>
        b.rainbowBlock - a.rainbowBlock ||
        b.standard[0] - a.standard[0] ||
        b.standard[1] - a.standard[1],
    );
  }
  if (max <= 1) return undefined;
  return candidate[0].areaCoords;
};

const gravity = (graph, N) => {
  for (let c = 0; c < N; c++) {
    let emptyRow = -1;
    for (let r = N - 1; r >= 0; r--) {
      if (graph[r][c] === -2) {
        if (emptyRow === -1) emptyRow = r;
      } else if (graph[r][c] >= 0) {
        if (emptyRow !== -1) {
          graph[emptyRow][c] = graph[r][c];
          graph[r][c] = -2;
          emptyRow--;
        }
      } else if (graph[r][c] === -1) {
        emptyRow = -1; // Reset for black blocks
      }
    }
  }
};

const rotate = (graph, N) => {
  const newGraph = Array.from({ length: N }, () => Array(N).fill(0));
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      newGraph[N - c - 1][r] = graph[r][c];
    }
  }
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      graph[r][c] = newGraph[r][c];
    }
  }
};

const autoplay = (graph, M) => {
  let score = 0;
  const N = graph.length;
  while (true) {
    const areaCooords = findBiggestBlock(graph, N, M);
    if (!areaCooords) break;
    score += Math.pow(areaCooords.length, 2);
    areaCooords.forEach(([r, c]) => (graph[r][c] = -2));
    gravity(graph, N);
    rotate(graph, N);
    gravity(graph, N);
  }
  console.log(score);
};

const solution = (input) => {
  const [N, M] = input[0].split(" ").map(Number);

  const graph = [];
  for (let i = 1; i <= N; i++) {
    graph.push(input[i].split(" ").map(Number));
  }
  autoplay(graph, M);
};

solution(input);
