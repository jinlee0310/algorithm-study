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

const combination = (arr, n) => {
  if (n === 1) return arr.map((v) => [v]);
  const answer = [];

  arr.forEach((v, idx, arr) => {
    const rest = arr.slice(idx + 1);
    const combinations = combination(rest, n - 1);
    const attach = combinations.map((combination) =>
      [v, ...combination].sort().join(""),
    );
    answer.push(...attach);
  });

  return answer.sort();
};

const solution = (input) => {
  const [L, C] = input[0].split(" ").map(Number);
  const arr = input[1].split(" ");
  const combinations = combination(arr, L);
  const answer = [];
  const vowel = ["a", "e", "i", "o", "u"];
  for (let str of combinations) {
    let vowelCnt = 0;
    let consonantCnt = 0;
    for (let word of str) {
      if (vowel.includes(word)) {
        vowelCnt++;
      } else {
        consonantCnt++;
      }
    }
    if (vowelCnt >= 1 && consonantCnt >= 2) {
      answer.push(str);
    }
  }
  console.log(answer.join("\n"));
};

solution(input);
