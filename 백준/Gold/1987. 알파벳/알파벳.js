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

// 범위 체크 함수
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;

const moves = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let max = 0;

// 비트마스크에 세팅된 비트 개수를 세는 함수
const countBits = (n) => {
  let count = 0;
  while (n) {
    count += n & 1;
    n >>>= 1;
  }
  return count;
};

// DFS: 현재 위치 (r, c)에서 bitmask에 저장된 방문 알파벳을 기준으로 탐색
const dfs = (board, bitmask, r, c) => {
  // 현재까지 방문한 알파벳의 개수를 업데이트
  const curCount = countBits(bitmask);
  max = Math.max(max, curCount);
  if (curCount === 26) return; // 더 이상 늘릴 수 없으므로 종료

  for (let [dr, dc] of moves) {
    const nr = r + dr;
    const nc = c + dc;
    if (isIn(nr, nc, board.length, board[0].length)) {
      const ch = board[nr][nc];
      // 해당 알파벳에 해당하는 비트 계산 (A:0, B:1, ..., Z:25)
      const bit = 1 << (ch.charCodeAt(0) - "A".charCodeAt(0));
      if ((bitmask & bit) === 0) {
        // 아직 방문하지 않은 알파벳이면
        dfs(board, bitmask | bit, nr, nc);
      }
    }
  }
};

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1).map((row) => row.split(""));

// 시작점 (0, 0)
const initialChar = board[0][0];
const initialBit = 1 << (initialChar.charCodeAt(0) - "A".charCodeAt(0));
dfs(board, initialBit, 0, 0);
console.log(max);
