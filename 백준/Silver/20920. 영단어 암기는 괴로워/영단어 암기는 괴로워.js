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
  const [N, M] = input[0].split(" ").map(Number);
  const obj = {};
  for (let i = 1; i <= N; i++) {
    const word = input[i];
    if (word.length >= M) {
      if (obj[word]) obj[word]++;
      else obj[word] = 1;
    }
  }

  const arr = Object.entries(obj)
    .sort(
      (a, b) =>
        b[1] - a[1] || b[0].length - a[0].length || a[0].localeCompare(b[0]),
    )
    .map(([key]) => key);

  console.log(arr.join("\n"));
};

solution(input);
