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

  const arr = Array.from({ length: N }, (_, k) => k + 1);
  for (let i = 1; i <= M; i++) {
    const [n1, n2] = input[i].split(" ").map((v) => Number(v) - 1);
    const temp = arr[n1];
    arr[n1] = arr[n2];
    arr[n2] = temp;
  }
  console.log(arr.join(" "));
};

solution(input);
