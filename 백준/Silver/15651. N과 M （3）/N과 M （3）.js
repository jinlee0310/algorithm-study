const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .trim();

const backtracking = (arr, M, answer = []) => {
  if (answer.length === M) {
    return [answer.join(" ")];
  }

  const result = [];
  for (let i = 0; i < arr.length; i++) {
    answer.push(arr[i]);
    result.push(...backtracking(arr, M, answer));
    answer.pop();
  }
  return result;
};

const solution = (input) => {
  const [N, M] = input.split(" ").map(Number);

  const arr = Array.from({ length: N }, (_, k) => k + 1);
  const result = backtracking(arr, M);
  console.log(result.join("\n"));
};

solution(input);
