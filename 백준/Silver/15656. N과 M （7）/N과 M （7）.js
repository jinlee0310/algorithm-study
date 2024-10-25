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

  const result = [];
  for (let num of arr) {
    answer.push(num);
    result.push(...backtracking(arr, M, answer));
    answer.pop();
  }
  return result;
};

const solution = (input) => {
  const [N, M] = input[0].split(" ").map(Number);
  const arr = input[1].split(" ").map(Number);
  arr.sort((a, b) => a - b);
  const result = backtracking(arr, M);
  console.log(result.join("\n"));
};

solution(input);
