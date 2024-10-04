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
  const n = Number(input);
  const answer = [];
  for (let s = n; s > 0; s--) {
    answer.push(s);
  }
  console.log(answer.join("\n"));
};

solution(input);
