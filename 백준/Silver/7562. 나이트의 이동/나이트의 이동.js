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

const bfs = (N, start, end) => {
  const visited = Array.from({ length: N }, () => Array(N).fill(0));
  const queue = [start];

  const move = [
    [1, 2],
    [2, 1],
    [-1, 2],
    [2, -1],
    [1, -2],
    [-2, 1],
    [-1, -2],
    [-2, -1],
  ];

  while (queue.length) {
    const [x, y] = queue.shift();

    if (x === end[0] && y === end[1]) break;

    for (let i = 0; i < move.length; i++) {
      const nx = x + move[i][0];
      const ny = y + move[i][1];

      if (0 <= nx && nx < N && 0 <= ny && ny < N && visited[ny][nx] === 0) {
        visited[ny][nx] = visited[y][x] + 1;
        queue.push([nx, ny]);
      }
    }
  }
  return visited[end[1]][end[0]];
};

const solution = (input) => {
  const T = Number(input[0]);

  let idx = 1;
  for (let i = 0; i < T; i++) {
    const N = Number(input[idx]);
    const start = input[idx + 1].split(" ").map(Number);
    const end = input[idx + 2].split(" ").map(Number);
    console.log(bfs(N, start, end));
    idx += 3;
  }
};

solution(input);
