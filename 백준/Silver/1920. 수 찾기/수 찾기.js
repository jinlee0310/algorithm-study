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

const binarySearch = (numArr, target) => {
  let st = 0,
    en = numArr.length - 1;

  while (st <= en) {
    const mid = Math.floor((st + en) / 2);
    if (numArr[mid] === target) return true;
    else if (numArr[mid] > target) {
      en = mid - 1;
    } else {
      st = mid + 1;
    }
  }
  return false;
};

const solution = (input) => {
  const [n, numArr, m, targetArr] = input.map((v) => {
    if (typeof v === "number") return Number(v);
    else return v.split(" ").map((v) => Number(v));
  });

  numArr.sort((a, b) => a - b);

  for (let i = 0; i < m; i++) {
    if (binarySearch(numArr, targetArr[i])) {
      console.log(1);
    } else {
      console.log(0);
    }
  }
};

solution(input);
