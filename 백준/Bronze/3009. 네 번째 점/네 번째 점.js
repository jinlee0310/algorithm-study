// BOJ 3009 네 번째 점
const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "input.txt"),
    "utf8"
  )
  .trim()
  .split("\n")
  .map(l => l.trim().split(" ").map(Number));

const xs = input.map(p => p[0]);
const ys = input.map(p => p[1]);

const fourthX = xs[0] === xs[1] ? xs[2] : (xs[0] === xs[2] ? xs[1] : xs[0]);
const fourthY = ys[0] === ys[1] ? ys[2] : (ys[0] === ys[2] ? ys[1] : ys[0]);

console.log(`${fourthX} ${fourthY}`);