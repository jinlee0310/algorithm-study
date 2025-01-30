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
  const s = new Set();
  for (let i = 1; i <= 30; i++) {
    s.add(i);
  }
  for (let i = 0; i < 28; i++) {
    const n = Number(input[i]);
    s.delete(n);
  }
  for (const item of s) {
    console.log(item);
  }
};

solution(input);
