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
  const n = Number(input[0]);
  const arr = [];
  for (let i = 1; i <= n; i++) {
    const [age, name] = input[i].split(" ");
    arr.push([Number(age), name, i]);
  }
  arr.sort((a, b) => a[0] - b[0] || a[2] - b[2]);
  for (const el of arr) {
    console.log(`${el[0]} ${el[1]}`);
  }
};

solution(input);
