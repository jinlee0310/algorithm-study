const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim();

const number = Number(input);

let arr = Array.from({ length: number }, (_, idx) => idx + 1);

while (arr.length > 1) {
  arr = arr.filter((_, idx) => (idx + 1) % 2 === 0);
}
console.log(arr[0]);
