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

const bfs = (board, visited, start, L, R) => {
  visited[start[1]][start[0]] = true;
  const area = [{ population: board[start[1]][start[0]], pos: start }];
  const N = board.length;
  const queue = [start];

  const nearby = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let k = 0; k < 4; k++) {
      const nx = x + nearby[k][0];
      const ny = y + nearby[k][1];
      if (0 <= nx && nx < N && 0 <= ny && ny < N && !visited[ny][nx]) {
        const diff = Math.abs(board[y][x] - board[ny][nx]);
        if (L <= diff && diff <= R) {
          visited[ny][nx] = true;
          queue.push([nx, ny]);
          area.push({ population: board[ny][nx], pos: [nx, ny] });
        }
      }
    }
  }
  if (area.length === 1) {
    visited[start[1]][start[0]] = false;
    return [];
  } else {
    return area;
  }
};

const moving = (board, L, R) => {
  const N = board.length;

  let cnt = 0;
  while (true) {
    const areas = [];

    const visited = Array.from({ length: N }, () => Array(N).fill(false));
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        if (!visited[j][i]) {
          const area = bfs(board, visited, [i, j], L, R);
          if (area.length > 0) areas.push(area);
        }
      }
    }

    if (areas.length === 0) break;

    cnt++;
    areas.forEach((area) => {
      const sum = area.reduce((acc, cur) => acc + cur.population, 0);
      const newPopulation = Math.floor(sum / area.length);
      area.forEach(({ pos }) => (board[pos[1]][pos[0]] = newPopulation));
    });
  }
  return cnt;
};

const solution = (input) => {
  const [N, L, R] = input[0].split(" ").map(Number);
  const board = [];
  for (let i = 1; i <= N; i++) {
    board.push(input[i].split(" ").map(Number));
  }
  const cnt = moving(board, L, R);
  console.log(cnt);
};

solution(input);
