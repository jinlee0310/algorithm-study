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

const solution = (input) => {
  const [n, m] = input.split(" ").map((v) => Number(v));
  console.log(n * 100 >= m ? "Yes" : "No");
};

solution(input);
