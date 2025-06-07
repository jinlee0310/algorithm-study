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

const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const solution = (input) => {
  const [pqStr, kStr] = input.split(" ");
  const pq = BigInt(pqStr);
  const k = Number(kStr);

  for (let i = 2; i < k; i++) {
    if (isPrime(i) && pq % BigInt(i) === 0n) {
      console.log(`BAD ${i}`);
      return;
    }
  }
  console.log("GOOD");
};

solution(input);