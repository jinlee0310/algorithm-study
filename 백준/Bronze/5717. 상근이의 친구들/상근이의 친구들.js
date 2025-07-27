const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim()
  .split("\n");

const solution = (input) => {
  const answer = [];
  for (let i = 0; i < input.length; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    answer.push(a + b);
  }
  console.log(answer.join("\n"));
};

input.pop();
solution(input);
