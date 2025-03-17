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

let n = input;
let cnt = 0;

while (n.length > 1) {
  let temp = 1;
  for (let i = 0; i < n.length; i++) {
    temp *= n[i];
  }
  n = temp.toString();
  cnt++;
}
console.log(cnt);
