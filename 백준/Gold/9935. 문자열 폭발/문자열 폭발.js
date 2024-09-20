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

function solution(input) {
  const original = input[0];
  const bomb = input[1];
  let stack = [];
  const bombLength = bomb.length;

  for (let char of original) {
    stack.push(char);

    // 스택 끝부분이 폭발 문자열과 일치하는지 확인
    if (stack.slice(-bombLength).join("") === bomb) {
      // 폭발 문자열 제거
      stack.splice(-bombLength, bombLength);
    }
  }

  // 결과 출력
  const result = stack.join("");
  return result.length === 0 ? "FRULA" : result;
}

console.log(solution(input));
