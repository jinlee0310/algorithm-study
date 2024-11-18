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

const getMaxScore = (board) => {
  const tetrominoes = [
    // [x,y]
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [1, -1],
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [1, -1],
      [2, -1],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [-1, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 0],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [-1, 2],
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
    ],
    [
      [0, 0],
      [-1, 0],
      [-1, 1],
      [-1, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 0],
      [0, -1],
      [1, -1],
      [2, -1],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, -1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 0],
      [0, 1],
      [-1, 1],
      [-1, 2],
    ],
  ];
  let maxScore = 0;
  for (let j = 0; j < board.length; j++) {
    for (let i = 0; i < board[0].length; i++) {
      for (const tetromino of tetrominoes) {
        let sum = 0;
        let valid = true;
        for (const [dx, dy] of tetromino) {
          const nx = i + dx;
          const ny = j + dy;
          if (nx < 0 || ny < 0 || nx >= board[0].length || ny >= board.length) {
            valid = false;
            break;
          }

          sum += board[ny][nx];
        }

        if (valid) {
          maxScore = Math.max(maxScore, sum);
        }
      }
    }
  }

  return maxScore;
};

const solution = (input) => {
  const [N, M] = input[0].split(" ").map(Number);
  const board = [...input.slice(1).map((v) => v.split(" ").map(Number))];
  // console.log(board);
  const answer = getMaxScore(board);
  console.log(answer);
};

solution(input);
