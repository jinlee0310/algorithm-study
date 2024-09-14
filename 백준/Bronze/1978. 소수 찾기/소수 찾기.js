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

const isPrime = (num) => {
  if (num === 1) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const solution = (input) => {
  const numArr = input[1].split(" ").map((v) => Number(v));
  let answer = 0;
  for (let i = 0; i < numArr.length; i++) {
    if (isPrime(numArr[i])) {
      answer++;
    }
  }
  console.log(answer);
};

solution(input);
