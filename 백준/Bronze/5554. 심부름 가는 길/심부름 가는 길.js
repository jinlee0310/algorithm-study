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
  let sec = 0;
  for (let time of input) {
    sec += time;
  }
  console.log(Math.floor(sec / 60));
  console.log(sec % 60);
};

solution(input.map(Number));
