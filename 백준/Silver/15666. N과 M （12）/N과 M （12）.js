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

function backtracking(arr, m) {
  // 현재 순열에 포함된 원소
  const selected = [];

  const answer = new Set();
  function dfs(arr, depth) {
    // 모든 순열을 확인하는 부분
    if (depth === m) {
      let result = []; // 순열 결과 저장
      for (let i of selected) {
        result.push(arr[i]);
      }
      answer.add(result.join(" "));
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[selected[selected.length - 1]] > arr[i]) continue;
      selected.push(i); // 현재 원소 선택
      dfs(arr, depth + 1); // 재귀함수 호출
      selected.pop(); // 현재 원소 선택 취소
    }
  }
  dfs(arr, 0);
  return Array.from(answer).join("\n");
}

const solution = (input) => {
  const [n, m] = input[0].split(" ").map((v) => Number(v));
  const numArr = input[1].split(" ").map((v) => Number(v));
  numArr.sort((a, b) => a - b);
  console.log(backtracking(numArr, m));
};

solution(input);
