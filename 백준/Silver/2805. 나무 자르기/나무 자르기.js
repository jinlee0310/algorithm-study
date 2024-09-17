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

const hasSameColor = (paper) => {
  const num = paper[0][0];
  for (let i = 0; i < paper.length; i++) {
    for (let j = 0; j < paper.length; j++) {
      if (paper[j][i] !== num) return false;
    }
  }
  return true;
};

const solution = (input) => {
  const [n, m] = input[0].split(" ").map((v) => Number(v));
  const arr = input[1]
    .split(" ")
    .map((v) => Number(v))
    .sort((a, b) => a - b);

  let st = 0;
  en = arr[arr.length - 1];
  while (st <= en) {
    const mid = Math.floor((st + en) / 2);
    let sum = 0;
    for (const tree of arr) {
      if (tree - mid >= 0) {
        sum += tree - mid;
      }
    }
    if (sum === m) {
      console.log(mid);
      return;
    } else if (sum > m) st = mid + 1;
    else en = mid - 1;
  }
  console.log(en);
};

solution(input);
