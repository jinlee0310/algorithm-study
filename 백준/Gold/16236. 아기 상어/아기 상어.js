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

const bfs = (graph, shark) => {
  const dist = Array.from({ length: graph.length }, () =>
    Array(graph.length).fill(-1),
  );
  const queue = [[shark.x, shark.y]];
  dist[shark.y][shark.x] = 0;

  const fishList = [];

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
        dist[ny][nx] === -1
      ) {
        if (graph[ny][nx] <= shark.size) {
          dist[ny][nx] = dist[y][x] + 1;

          if (graph[ny][nx] > 0 && graph[ny][nx] < shark.size) {
            fishList.push({ x: nx, y: ny, dist: dist[ny][nx] });
          }
          queue.push([nx, ny]);
        }
      }
    }
  }

  if (fishList.length === 0) return null;

  fishList.sort((a, b) => a.dist - b.dist || a.y - b.y || a.x - b.x);
  return fishList[0];
};

const solution = (input) => {
  const n = Number(input[0]);
  const graph = [];
  for (let i = 1; i <= n; i++) {
    graph.push(input[i].split(" ").map((v) => Number(v)));
  }

  let time = 0;
  let shark = { x: 0, y: 0, size: 2, eatCount: 0 };
  // console.log(graph);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (graph[j][i] === 9) {
        shark.x = i;
        shark.y = j;
        graph[j][i] = 0;
        break;
      }
    }
  }

  while (true) {
    const target = bfs(graph, shark);

    if (target === null) break;

    graph[target.y][target.x] = 0;
    shark.x = target.x;
    shark.y = target.y;
    time += target.dist;

    shark.eatCount += 1;
    if (shark.eatCount === shark.size) {
      shark.size += 1;
      shark.eatCount = 0;
    }
  }
  console.log(time);
};

solution(input);
