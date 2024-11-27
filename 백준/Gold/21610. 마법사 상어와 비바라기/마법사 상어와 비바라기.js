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

const rainy = (board, operations) => {
  const N = board.length;
  let clouds = [
    // r,c
    [N - 1, 0],
    [N - 1, 1],
    [N - 2, 0],
    [N - 2, 1],
  ];
  const directions = [
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
  ];

  for (const operation of operations) {
    const [d, s] = operation;
    const cloudCoords = Array.from({ length: N }, () => Array(N).fill(false));
    clouds = clouds.map(([r, c]) => {
      let nr = (r + directions[d][0] * s) % N;
      let nc = (c + directions[d][1] * s) % N;
      if (nr < 0) nr += N;
      if (nc < 0) nc += N;
      cloudCoords[nr][nc] = true;
      return [nr, nc];
    });

    clouds.forEach(([r, c]) => {
      board[r][c]++;
    });
    clouds.forEach(([r, c]) => {
      for (let i = 1; i <= 7; i += 2) {
        const nr = r + directions[i][0];
        const nc = c + directions[i][1];

        if (0 <= nr && nr < N && 0 <= nc && nc < N && board[nr][nc] !== 0) {
          board[r][c]++;
        }
      }
    });
    const newClouds = [];
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        if (board[r][c] >= 2 && !cloudCoords[r][c]) {
          board[r][c] -= 2;
          newClouds.push([r, c]);
        }
      }
    }
    clouds = newClouds;
  }
  let sum = 0;
  for (const row of board) {
    for (const water of row) {
      sum += water;
    }
  }
  console.log(sum);
};

const solution = (input) => {
  const [N, M] = input[0].split(" ").map(Number);
  const board = [];
  for (let i = 1; i <= N; i++) {
    board.push(input[i].split(" ").map(Number));
  }
  const operations = [];
  for (let i = N + 1; i <= N + M; i++) {
    const [d, s] = input[i].split(" ").map(Number);
    operations.push([d - 1, s]);
  }
  rainy(board, operations);
};

solution(input);
