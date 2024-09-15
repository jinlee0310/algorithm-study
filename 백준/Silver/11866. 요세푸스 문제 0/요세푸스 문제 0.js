const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString();

const solution = (input) => {
  const [n, k] = input.split(" ").map((v) => Number(v));
  const arr = Array.from({ length: n }, (_, idx) => idx + 1);
  const answer = [];
  while (arr.length) {
    let cnt = 1;
    while (cnt < k) {
      cnt++;
      arr.push(arr.shift());
    }
    answer.push(arr.shift());
  }
  console.log(`<${answer.join(", ")}>`);
};

solution(input);
