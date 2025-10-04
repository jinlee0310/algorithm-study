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
  .split("\n");

const getPrimes = (n) => {
  const isPrime = Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  return isPrime.map((v, i) => (v ? i : null)).filter((v) => v !== null);
};

const solution = (input) => {
  let N = Number(input);
  const primeNums = getPrimes(N);

  const answer = [];

  let i = 0;
  while (N > 1) {
    if (N % primeNums[i] === 0) {
      answer.push(primeNums[i]);
      N /= primeNums[i];
    } else {
      i++;
    }
  }
  console.log(answer.join("\n"));
};

solution(input);
