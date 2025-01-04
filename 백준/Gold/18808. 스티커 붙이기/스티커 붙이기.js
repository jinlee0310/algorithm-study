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

const canAttach = (board, start, sticker) => {
  for (let stR = 0; stR < sticker.length; stR++) {
    for (let stC = 0; stC < sticker[0].length; stC++) {
      if (
        board[stR + start[0]][stC + start[1]] === 1 &&
        sticker[stR][stC] === 1
      ) {
        return false;
      }
    }
  }
  return true;
};

const rotate = (sticker) => {
  const R = sticker.length,
    C = sticker[0].length;
  const newSticker = Array.from({ length: C }, () => Array(R).fill(0));
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      newSticker[c][R - 1 - r] = sticker[r][c];
    }
  }
  return newSticker;
};

const findSpace = (board, sticker) => {
  const R = board.length,
    C = board[0].length;
  const starts = [];
  for (let r = 0; r <= R - sticker.length; r++) {
    for (let c = 0; c <= C - sticker[0].length; c++) {
      if (canAttach(board, [r, c], sticker)) {
        starts.push([r, c]);
      }
    }
  }

  if (starts.length > 0) {
    starts.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    return starts[0];
  }
};

const attach = (board, sticker, start) => {
  for (let r = start[0]; r < start[0] + sticker.length; r++) {
    for (let c = start[1]; c < start[1] + sticker[0].length; c++) {
      if (sticker[r - start[0]][c - start[1]]) {
        board[r][c] = sticker[r - start[0]][c - start[1]];
      }
    }
  }
};

const count = (board) => {
  let cnt = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j]) cnt++;
    }
  }
  return cnt;
};

const solution = (input) => {
  const [N, M, K] = input[0].split(" ").map(Number);
  const board = Array.from({ length: N }, () => Array(M).fill(0));
  let lineIdx = 1;
  const stickers = [];
  for (let i = 0; i < K; i++) {
    const [R, C] = input[lineIdx].split(" ").map(Number);
    lineIdx++;
    const sticker = [];
    for (let j = 0; j < R; j++) {
      sticker.push(input[lineIdx].split(" ").map(Number));
      lineIdx++;
    }
    stickers.push(sticker);
  }

  for (let sticker of stickers) {
    let _sticker = sticker;
    let idx = 0;
    let start = null;
    while (idx < 4) {
      start = findSpace(board, _sticker);

      if (start) break;
      _sticker = rotate(_sticker);
      idx++;
    }
    if (!start) continue;

    attach(board, _sticker, start);
  }

  console.log(count(board));
};

solution(input);
