const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : path.join(__dirname, "input.txt"))
  .toString()
  .trim();

const n = Number(input);
const side = (1 << n) + 1;      // 2^n + 1
const ans = side * side;        // (2^n + 1)^2

console.log(ans);