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

const n = Number(input);

let str = "";

for (let i = 0; i < Math.floor(n / 4); i++) {
  str += "long ";
}
console.log(str + "int");
