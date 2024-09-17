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

const recursion = (a, b, c) => {
  if (b === BigInt(1)) return a % c;

  if (b % BigInt(2) === BigInt(0)) {
    return recursion(a, b / BigInt(2), c) ** BigInt(2) % c;
  } else {
    return (recursion(a, (b - BigInt(1)) / BigInt(2), c) ** BigInt(2) * a) % c;
  }
};

const solution = (input) => {
  const [a, b, c] = input.split(" ").map((v) => BigInt(v));
  console.log(recursion(a, b, c).toString());
};

solution(input);
