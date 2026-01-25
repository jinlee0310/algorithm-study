const path = require("path");
const fs = require("fs");

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
  const N = Number(input[0]);
  const arr = input
    .slice(1)
    .map(Number)
    .sort((a, b) => a - b);
  const avg = arr.reduce((prev, cur) => prev + cur, 0) / N;
  const mid = arr[Math.floor(N / 2)];
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const map = {};
  arr.forEach((v) => {
    if (map[v]) {
      map[v]++;
    } else {
      map[v] = 1;
    }
  });

  const maxFreq = Math.max(...Object.values(map));
  const temp = Object.entries(map)
    .filter(([k, v]) => v === maxFreq)
    .map(([k, v]) => Number(k))
    .sort((a, b) => a - b);

  console.log(Math.round(avg) === -0 ? 0 : Math.round(avg));
  console.log(mid);
  console.log(temp.length === 1 ? temp[0] : temp[1]);
  console.log(max - min);
};

solution(input);
