const path = require("path");
const fs = require("fs");

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
  const N = Number(input[0]);
  const set = new Set();
  let answer = 0;
  for (let i = 1; i <= N; i++) {
    const [a, b] = input[i].split(" ");
    if (a === "ChongChong") {
      set.add(b);
    } else if (b === "ChongChong") {
      set.add(a);
    } else {
      if (set.has(a)) {
        set.add(b);
      } else if (set.has(b)) {
        set.add(a);
      }
    }
  }
  console.log(set.size + 1);
};

solution(input);
