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

const findCandidate = (row, col, rect) => {
  const candidates = [];
  for (let i = 1; i <= 9; i++) {
    if (!row.includes(i) && !col.includes(i) && !rect.includes(i))
      candidates.push(i);
  }
  return candidates;
};

const backtracking = (board, candidates, emptyCells, idx = 0) => {
  if (idx === emptyCells.length) {
    return true; // 모든 빈 칸을 채웠다면 완료
  }

  const [r, c] = emptyCells[idx];
  for (const num of candidates[r][c]) {
    if (isValid(board, r, c, num)) {
      board[r][c] = num;
      if (backtracking(board, candidates, emptyCells, idx + 1)) {
        return true; // 다음 빈 칸을 채우는 데 성공하면 종료
      }
      board[r][c] = 0; // 실패 시 되돌리기
    }
  }

  return false; // 가능한 숫자가 없다면 false 반환
};

const isValid = (board, row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }

  return true;
};

const solution = (input) => {
  const board = input.map((v) => v.split("").map(Number));
  const candidates = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => []),
  );
  const emptyCells = [];
  // console.log(candidates);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        const rect = [];
        const startC = Math.floor(j / 3) * 3;
        const startR = Math.floor(i / 3) * 3;
        for (let r = startR; r <= startR + 2; r++) {
          for (let c = startC; c <= startC + 2; c++) {
            rect.push(board[r][c]);
          }
        }
        const candidate = findCandidate(
          board[i],
          board.map((v) => v[j]),
          rect,
        );
        if (candidate.length === 1) {
          board[i][j] = candidate[0];
        } else {
          candidates[i][j].push(...candidate);
          emptyCells.push([i, j]);
        }
      }
    }
  }
  // console.log(board);
  // console.log(candidates);
  backtracking(board, candidates, emptyCells);
  console.log(board.map((v) => v.join("")).join("\n"));
};

solution(input);
