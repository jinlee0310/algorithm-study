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

const [a, b, c] = input.split(" ").map(Number);

if (a === b && b === c && c === a) {
  console.log(10000 + a * 1000);
} else if (a === b && b !== c) {
  console.log(1000 + a * 100);
} else if (b === c && c !== a) {
  console.log(1000 + b * 100);
} else if (c === a && a !== b) {
  console.log(1000 + c * 100);
} else {
  console.log(Math.max(a, b, c) * 100);
}
