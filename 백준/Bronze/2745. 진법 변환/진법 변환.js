const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim();

const solution = (input) => {
  const [n, b] = input.split(" ");
  let answer = BigInt(0);
  for (let i = 0; i < n.length; i++) {
    const str = n[i];
    const digit = n.length - i - 1;
    if (65 <= str.charCodeAt(0) && str.charCodeAt(0) <= 90) {
      answer += BigInt((str.charCodeAt(0) - 55) * Math.pow(b, digit));
    } else {
      answer += BigInt(Number(str) * Math.pow(b, digit));
    }
  }
  console.log(answer.toString());
};

solution(input);
