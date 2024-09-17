const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .trim();

const solution = (input) => {
  const [n, r, c] = input.split(" ").map((v) => Number(v));

  let res = 0;
  const divide = (row, col, size) => {
    if (row === r && col === c) {
      // 좌표 찾음
      console.log(res);
      return;
    }
    if (r >= row && r < row + size && c >= col && c < col + size) {
      // 영역 내에 있음
      size = parseInt(size / 2);
      divide(row, col, size);
      divide(row, col + size, size);
      divide(row + size, col, size);
      divide(row + size, col + size, size);
    } else res += size * size; // 좌표 못 찾음!
  };
  divide(0, 0, Math.pow(2, n));
};

solution(input);
