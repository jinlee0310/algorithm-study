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

const [arr1, arr2] = input.map((v) => v.split(""));

let idx = 0;
while (arr1.length && idx < arr1.length) {
  const str = arr1[idx];
  if (arr2.includes(str)) {
    const arr1Idx = arr1.findIndex((v) => v === str);
    const arr2Idx = arr2.findIndex((v) => v === str);
    arr1.splice(arr1Idx, 1);
    arr2.splice(arr2Idx, 1);
  } else {
    idx++;
  }
}
console.log(arr1.length + arr2.length);
