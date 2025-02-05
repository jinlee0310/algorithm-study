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
  const set = new Set();
  for (let i = 0; i < input.length; i++) {
    for (let j = i; j < input.length; j++) {
      const part = input.slice(i, j + 1);
      set.add(part);
    }
  }
  console.log(set.size);
};

solution(input);
