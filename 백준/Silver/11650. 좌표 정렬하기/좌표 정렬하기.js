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
  const n = Number(input[0]);
  const coords = [];
  for (let i = 1; i <= n; i++) {
    coords.push(input[i].split(" ").map((v) => Number(v)));
  }
  coords.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  for (let i = 0; i < coords.length; i++) {
    console.log(coords[i].join(" "));
  }
};
solution(input);
