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

const [A, B, V] = input.split(" ").map(Number);

const divide = Math.ceil((V - A) / (A - B));

console.log(divide + 1);
