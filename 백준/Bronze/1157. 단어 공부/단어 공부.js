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

// 97~122
const lowTable = Array(26).fill(0);

const str = input.toLowerCase();

for (let i = 0; i < str.length; i++) {
  const ascii = str[i].charCodeAt();
  lowTable[ascii - 97]++;
}
const max = Math.max(...lowTable);
const cnt = lowTable.filter((v) => v === max).length;

if (cnt > 1) {
  console.log("?");
} else {
  const idx = lowTable.findIndex((v) => v === max);
  console.log(String.fromCharCode(idx + 97).toUpperCase());
}
