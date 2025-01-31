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

const solution = (input) => {
  const [N, M] = input[0].split(" ").map(Number);
  const arr = Array.from({ length: N + 1 }, (_, k) => k);
  for (let i = 1; i <= M; i++) {
    const [n1, n2] = input[i].split(" ").map(Number);
    const slicedArr = arr.slice(n1, n2 + 1).reverse();
    for (let j = n1; j <= n2; j++) {
      arr[j] = slicedArr[j - n1];
    }
  }
  arr.shift();
  console.log(arr.join(" "));
};

solution(input);
