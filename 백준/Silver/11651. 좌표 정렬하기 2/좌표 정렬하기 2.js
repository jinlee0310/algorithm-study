const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim()
  .split("\n");

const answer = input
  .slice(1)
  .map((v) => v.split(" ").map(Number))
  .sort((a, b) => a[1] - b[1] || a[0] - b[0])
  .map((v) => v.join(" "))
  .join("\n");

console.log(answer);
