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

const parsedStr = input.split("-");
let min = 0;
parsedStr.forEach((str, idx) => {
  const sum = str.split("+").reduce((acc, cur) => acc + Number(cur), 0);
  if (idx === 0) {
    min += sum;
  } else {
    min -= sum;
  }
});
console.log(min);
