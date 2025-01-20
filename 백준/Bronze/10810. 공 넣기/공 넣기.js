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
  const baskets = Array(N).fill(0); // 바구니 초기화

  for (let m = 1; m <= M; m++) {
    const [i, j, k] = input[m].split(" ").map(Number);
    for (let b = i - 1; b <= j - 1; b++) {
      baskets[b] = k; // 범위에 공 번호 넣기
    }
  }

  console.log(baskets.join(" "));
};

solution(input);