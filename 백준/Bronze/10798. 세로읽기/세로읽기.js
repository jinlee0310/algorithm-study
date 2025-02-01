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

const solution = (input) => {
  const maxRowLength = Math.max(...input.map((str) => str.length));
  const arr = input.map((row) => {
    const newRow = Array(maxRowLength).fill("");
    const rowArr = row.split("");
    for (let i = 0; i < rowArr.length; i++) {
      newRow[i] = rowArr[i];
    }
    return newRow;
  });
  let str = "";
  for (let i = 0; i < arr[0].length; i++) {
    for (let j = 0; j < arr.length; j++) {
      str += arr[j][i];
    }
  }
  console.log(str);
};

solution(input);
