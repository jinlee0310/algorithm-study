const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim()
  .split("\n");

const [N, k] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

arr.sort((a, b) => b - a);
console.log(arr[k - 1]);
