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
  const set = new Set();

  for (let i of input) {
    const n = Number(i);
    set.add(n % 42);
  }
  let cnt = 0;
  for (let _ of set) {
    cnt++;
  }
  console.log(cnt);
};

solution(input);
