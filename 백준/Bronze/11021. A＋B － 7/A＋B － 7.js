const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .split("\n");

const solution = (input) => {
  const cnt = Number(input[0]);
  for (let i = 1; i <= cnt; i++) {
    const [a, b] = input[i].split(" ").map((v) => Number(v));
    console.log(`Case #${i}: ${a+b}`);
  }
};

solution(input);
