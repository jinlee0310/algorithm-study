const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .trim()
  .split("\n");

const T = Number(input[0]);
for (let i = 1; i <= T; i++) {
  const str = input[i];
  console.log(`${str[0]}${str[str.length - 1]}`);
}
