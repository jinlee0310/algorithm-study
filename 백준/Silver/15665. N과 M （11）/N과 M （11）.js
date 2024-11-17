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

function getSequences(nums, M) {
  const results = [];
  const temp = [];

  // 입력 배열 정렬 (사전 순 출력을 위해)
  nums.sort((a, b) => a - b);

  // 백트래킹 함수
  function backtrack(depth) {
    if (depth === M) {
      results.push([...temp]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      temp.push(nums[i]);
      backtrack(depth + 1); // 중복 허용: 현재 숫자부터 다시 선택 가능
      temp.pop(); // 탐색 후 복원
    }
  }

  backtrack(0);

  // 중복 제거 및 결과 반환
  return [...new Set(results.map((seq) => seq.join(" ")))].map((seq) =>
    seq.split(" ").map(Number),
  );
}

const solution = (input) => {
  const [N, M] = input[0].split(" ").map(Number);
  const arr = input[1].split(" ").map(Number);

  console.log(
    getSequences(arr, M)
      .map((v) => v.join(" "))
      .join("\n"),
  );
};

solution(input);
