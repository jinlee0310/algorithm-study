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
  const B = Number(input[0]);
  let A = 0;

  for (let i = 1; i <= B; i++) {
    if (i + Math.floor(i * 0.1) === B) {
      A = i;
      break;
    }
  }

  console.log(A);
};

solution(input);