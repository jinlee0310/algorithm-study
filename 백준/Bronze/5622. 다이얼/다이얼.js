const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim();

const solution = (input) => {
  const arr = ["ABC", "DEF", "GHI", "JKL", "MNO", "PQRS", "TUV", "WXYZ"];
  let answer = 0;
  for (let i = 0; i < input.length; i++) {
    const num = arr.findIndex((v) => v.includes(input[i]));
    answer += num + 2 + 1;
  }
  console.log(answer);
};

solution(input);
