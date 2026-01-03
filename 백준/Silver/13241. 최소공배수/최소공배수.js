const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim();

const [A, B] = input.split(" ").map(BigInt);

function gcd(a, b) {
  while (b !== 0n) {
    const r = a % b;
    a = b;
    b = r;
  }
  return a;
}

const g = gcd(A, B);
const l = (A / g) * B; // 보통 이 형태 추천 (중간값 줄이기)
console.log(l.toString());
