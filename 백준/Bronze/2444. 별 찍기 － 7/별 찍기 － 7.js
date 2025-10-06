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

const n = Number(input);

const answer = [];
for (let i = -n + 1; i < n; i++) {
  let str = "";
  for (let j = -n + 1; j < n; j++) {
    if (i === 0 || j === 0) str += "*";
    else {
      if (i < 0 && j < 0) {
        if (Math.abs(i + j) <= n - 1) str += "*";
        else str += " ";
      } else if (i < 0 && j > 0) {
        if (Math.abs(i - j) <= n - 1) str += "*";
      } else if (i > 0 && j < 0) {
        if (Math.abs(i - j) <= n - 1) str += "*";
        else str += " ";
      } else {
        if (Math.abs(i + j) <= n - 1) str += "*";
      }
    }
  }
  answer.push(str);
}
console.log(answer.join("\n"));
