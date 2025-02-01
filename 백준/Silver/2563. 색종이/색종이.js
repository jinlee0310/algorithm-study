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

const solution = (input) => {
  const board = Array.from({ length: 100 }, () => Array(100).fill(false));
  const papers = input.slice(1).map((row) => row.split(" ").map(Number));

  for (let paper of papers) {
    const [startC, startR] = paper;
    for (let i = startR; i < startR + 10; i++) {
      for (let j = startC; j < startC + 10; j++) {
        if (!board[i][j]) board[i][j] = true;
      }
    }
  }

  let cnt = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j]) cnt++;
    }
  }
  console.log(cnt);
};

solution(input);
