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
  const [N, M] = input[0].split(" ").map(Number);
  const A = new Set(input[1].split(" ").map(Number));
  const B = new Set(input[2].split(" ").map(Number));

  let cnt = 0;
  for (let el of A) {
    if (B.has(el)) {
      B.delete(el);
    } else {
      cnt++;
    }
  }

  console.log(cnt + B.size);
};

solution(input);
