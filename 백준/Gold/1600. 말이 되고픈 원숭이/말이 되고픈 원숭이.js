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

const bfs = (graph, K) => {
  const W = graph[0].length,
    H = graph.length;
  const visited = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => Array(K + 1).fill(false)),
  );
  visited[0][0][K] = true;

  // 말의 움직임
  const horseDx = [-2, -1, 1, 2, 2, 1, -1, -2];
  const horseDy = [1, 2, 2, 1, -1, -2, -2, -1];

  // 일반 움직임
  const monkeyDx = [0, 1, 0, -1];
  const monkeyDy = [1, 0, -1, 0];

  const queue = [[0, 0, K, 0]];

  while (queue.length > 0) {
    const [x, y, horseMovesLeft, steps] = queue.shift();

    // 목표 지점 도달
    if (x === W - 1 && y === H - 1) {
      return steps;
    }

    // 일반 움직임
    for (let i = 0; i < 4; i++) {
      const nx = x + monkeyDx[i];
      const ny = y + monkeyDy[i];

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < W &&
        ny < H &&
        !visited[ny][nx][horseMovesLeft] &&
        graph[ny][nx] === 0
      ) {
        visited[ny][nx][horseMovesLeft] = true;
        queue.push([nx, ny, horseMovesLeft, steps + 1]);
      }
    }

    // 말의 움직임
    if (horseMovesLeft > 0) {
      for (let i = 0; i < 8; i++) {
        const nx = x + horseDx[i];
        const ny = y + horseDy[i];

        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < W &&
          ny < H &&
          !visited[ny][nx][horseMovesLeft - 1] &&
          graph[ny][nx] === 0
        ) {
          visited[ny][nx][horseMovesLeft - 1] = true;
          queue.push([nx, ny, horseMovesLeft - 1, steps + 1]);
        }
      }
    }
  }
  // console.log(visited);
  return -1;
};

const solution = (input) => {
  const K = Number(input[0]);
  const [W, H] = input[1].split(" ").map(Number);
  const graph = [];
  graph.push(...input.slice(2).map((v) => v.split(" ").map(Number)));
  // console.log(graph);
  const answer = bfs(graph, K);
  console.log(answer);
};

solution(input);
