const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim()
  .split("\n")
  .slice(0, -1)
  .map(Number);

const solution = (n) => {
  let sum = 0;
  const factors = [];
  for (let i = 1; i < n; i++) {
    if (n % i === 0) {
      sum += i;
      factors.push(i);
    }
  }
  if (sum === n) {
    return `${n} = ${factors.join(" + ")}`;
  } else {
    return `${n} is NOT perfect.`;
  }
};

const answer = input.map(solution).join("\n");

console.log(answer);
