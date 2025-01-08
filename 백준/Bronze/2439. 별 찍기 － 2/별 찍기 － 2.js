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
  const N = Number(input);
  for (let i = 1; i <= N; i++) {
    let line = "";
    for (let j = N - i; j >= 1; j--) {
      line += " ";
    }
    for (let j = 1; j <= i; j++) {
      line += "*";
    }
    console.log(line);
  }
};

solution(input);
