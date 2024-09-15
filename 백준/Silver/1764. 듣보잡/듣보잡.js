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
  const [n, m] = input[0].split(" ").map((v) => Number(v));
  const set = new Set();

  for (let i = 1; i <= n; i++) {
    set.add(input[i]);
  }
  const answer = [];
  for (let i = n + 1; i <= n + m; i++) {
    if (set.has(input[i])) {
      answer.push(input[i]);
    }
  }
  answer.sort();
  console.log(answer.length);
  console.log(answer.join("\n"));
};

solution(input);
