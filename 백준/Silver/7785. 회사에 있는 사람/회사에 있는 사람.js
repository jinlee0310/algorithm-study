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
  const N = Number(input[0]);
  const set = new Set();

  for (let i = 1; i <= N; i++) {
    const [name, order] = input[i].split(" ");
    if (order === "enter") {
      set.add(name);
    } else {
      set.delete(name);
    }
  }

  console.log(Array.from(set).sort().reverse().join("\n"));
};

solution(input);
