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
  const [h, m] = input.split(" ").map(Number);
  let answer = 0;
  answer += (h - 9) * 60;
  answer += m;
  console.log(answer);
};

solution(input);
