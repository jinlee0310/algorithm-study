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

const arr = input.split(" ");
console.log(arr.length===1 && arr[0] === "" ? 0 : arr.length);
