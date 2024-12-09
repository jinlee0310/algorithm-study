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

const [x, y, w, h] = input.split(" ").map(Number);

console.log(Math.min(x, y, w - x, h - y));
