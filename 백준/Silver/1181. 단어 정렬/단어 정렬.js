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
  const n = Number(input[0]);
  const sWord = new Set();
  for (let i = 1; i <= n; i++) {
    sWord.add(input[i]);
  }
  const sortedArr = Array.from(sWord).sort((a, b) => {
    if (a.length - b.length > 0) return 1;
    else if (a.length - b.length < 0) return -1;
    else {
      return a.localeCompare(b);
    }
  });
  for (let i = 0; i < sortedArr.length; i++) {
    console.log(sortedArr[i]);
  }
};

solution(input);
