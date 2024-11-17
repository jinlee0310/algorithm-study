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
  const [N, W, H] = input[0].split(" ").map(Number);
  const answer = [];
  for (let i = 1; i <= N; i++) {
    const match = Number(input[i]);
    if (Math.sqrt(W * W + H * H) >= match) {
      answer.push("DA");
    } else {
      answer.push("NE");
    }
  }
  console.log(answer.join("\n"));
};

solution(input);
