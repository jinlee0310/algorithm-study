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

const backtracking = (arr, M, answer = []) => {
  if (answer.length === M) {
    return [answer.join(" ")];
  }

  const result = new Set();
  for (let i = 0; i < arr.length; i++) {
    answer.push(arr[i]);
    for (let numArr of backtracking(arr.slice(i + 1), M, answer)) {
      result.add(numArr);
    }
    answer.pop();
  }
  return Array.from(result);
};

const solution = (input) => {
  const [N, M] = input[0].split(" ").map(Number);
  const arr = input[1].split(" ").map(Number);
  arr.sort((a, b) => a - b);
  console.log(backtracking(arr, M).join("\n"));
};

solution(input);
