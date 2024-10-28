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
  for (let i = 0; i < input.length; i++) {
    const n = Number(input[i]);
    if (s.has(n)) {
      s.delete(n);
    } else {
      s.add(n);
    }
  }
  for (let value of s) {
    console.log(value);
  }
};

solution(input);
