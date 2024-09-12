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

const getLowIdx = (numArr, target) => {
  let st = 0,
    en = numArr.length;

  while (st < en) {
    const mid = Math.floor((st + en) / 2);
    if (target <= numArr[mid]) {
      en = mid;
    } else {
      st = mid + 1;
    }
  }
  return st;
};

const getUpperIdx = (numArr, target) => {
  let st = 0,
    en = numArr.length;

  while (st < en) {
    const mid = Math.floor((st + en) / 2);
    if (target < numArr[mid]) {
      en = mid;
    } else {
      st = mid + 1;
    }
  }
  return st;
};

const solution = (input) => {
  const [n, numArr, m, targetArr] = input.map((v) => {
    if (typeof v === "number") return Number(v);
    else return v.split(" ").map((v) => Number(v));
  });

  numArr.sort((a, b) => a - b);

  const answer = [];

  for (let i = 0; i < m; i++) {
    const lowIdx = getLowIdx(numArr, targetArr[i]);
    const upperIdx = getUpperIdx(numArr, targetArr[i]);
    answer.push(upperIdx - lowIdx);
  }
  return answer.join(" ");
};

console.log(solution(input));
