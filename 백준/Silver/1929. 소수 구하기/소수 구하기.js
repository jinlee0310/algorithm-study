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

const getPrime = (n) => {
  const isPrime = Array(n + 1).fill(true); // 모든 수를 소수로 가정
  isPrime[0] = isPrime[1] = false; // 0과 1은 소수가 아님

  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false; // i의 배수는 소수가 아님
      }
    }
  }
  return isPrime;
};

const solution = (input) => {
  const [M, N] = input.split(" ").map((v) => Number(v));
  const answer = [];
  const isPrime = getPrime(N);
  for (let i = M; i <= N; i++) {
    if (isPrime[i]) answer.push(i);
  }
  console.log(answer.join("\n"));
};

solution(input);
