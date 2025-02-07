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
  const [N, M] = input[0].split(" ").map(Number);
  const arr = input.slice(1).map((row) => row.split(""));

  const moves = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let answer = Infinity;
  for (let i = 0; i <= N - 8; i++) {
    for (let j = 0; j <= M - 8; j++) {
      // board가 black에서 시작
      let bCnt = 0;
      const bNewGraph = arr.slice(i, i + 8).map((row) => row.slice(j, j + 8));

      if (bNewGraph[0][0] === "W") {
        bCnt++;
        bNewGraph[0][0] = "B";
      }
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          for (let [dr, dc] of moves) {
            const nr = r + dr;
            const nc = c + dc;
            if (
              0 <= nr &&
              nr < 8 &&
              0 <= nc &&
              nc < 8 &&
              bNewGraph[nr][nc] === bNewGraph[r][c]
            ) {
              if (bNewGraph[r][c] === "B") bNewGraph[nr][nc] = "W";
              else bNewGraph[nr][nc] = "B";
              bCnt++;
            }
          }
        }
      }
      //board가 white에서 시작
      let wCnt = 0;
      const wNewGraph = arr.slice(i, i + 8).map((row) => row.slice(j, j + 8));

      if (wNewGraph[0][0] === "B") {
        wCnt++;
        wNewGraph[0][0] = "W";
      }
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          for (let [dr, dc] of moves) {
            const nr = r + dr;
            const nc = c + dc;
            if (
              0 <= nr &&
              nr < 8 &&
              0 <= nc &&
              nc < 8 &&
              wNewGraph[nr][nc] === wNewGraph[r][c]
            ) {
              if (wNewGraph[r][c] === "B") wNewGraph[nr][nc] = "W";
              else wNewGraph[nr][nc] = "B";
              wCnt++;
            }
          }
        }
      }
      answer = Math.min(wCnt, bCnt, answer);
    }
  }
  console.log(answer);
};

solution(input);
