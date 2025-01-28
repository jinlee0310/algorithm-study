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

let max = 0;
let idx = 0;

for (let i = 0; i < 9; i++) {
  const n = Number(input[i]);
  max = Math.max(max, n);
  if (max === n) idx = i + 1;
}
console.log(max);
console.log(idx);
