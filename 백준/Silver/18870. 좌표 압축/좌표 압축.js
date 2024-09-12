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
  const [n, numArr] = input.map((v) => {
    if (typeof v === "number") return Number(v);
    else return v.split(" ").map((v) => Number(v));
  });

  const numSet = new Set(numArr);
  const sortArr = Array.from(numSet).sort((a, b) => a - b);
  const obj = {};
  const answer = [];
  sortArr.forEach((v, idx) => (obj[v] = idx));
  for (let i = 0; i < n; i++) {
    answer.push(obj[numArr[i]]);
  }
  return answer.join(" ");
};

console.log(solution(input));
