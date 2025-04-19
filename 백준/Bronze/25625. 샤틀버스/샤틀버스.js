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

const [x, y] = input.split(" ").map(Number);
let answer;

if (x <= y) {
  answer = y - x;
} else {
  answer = x + y;
}
console.log(answer);
